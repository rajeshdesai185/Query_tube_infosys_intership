import os
import pandas as pd
import chromadb
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import Dict, List, Any
import shutil
from datetime import datetime
import psutil
import json


class AdminManager:
    def __init__(self, db_manager=None):
        self.dataset_path = "data/final_dataset_with_flag_transcript.csv"
        self.chroma_path = "chroma_db_data"
        self.collection_name = "videos_collection"
        self.model = None  # Lazy load the model
        self.db_manager = db_manager

    def _get_model(self):
        """Lazy load the sentence transformer model"""
        if self.model is None:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        return self.model

    def get_system_stats(self) -> Dict[str, Any]:
        """Get system and database statistics"""
        try:
            # Database stats
            if self.db_manager:
                collection = self.db_manager.collection
            else:
                client = chromadb.PersistentClient(path=self.chroma_path)
                collection = client.get_collection(name=self.collection_name)
            embedding_count = collection.count()

            # Dataset stats
            if os.path.exists(self.dataset_path):
                df = pd.read_csv(self.dataset_path)
                dataset_stats = {
                    "total_videos": int(len(df)),
                    "videos_with_transcripts": int(df['has_transcript'].sum()),
                    "total_channels": int(df['channel_title'].nunique()),
                    "avg_views": int(df['viewCount'].mean()) if 'viewCount' in df.columns else 0
                }
            else:
                dataset_stats = {"error": "Dataset file not found"}

            # System stats
            system_stats = {
                "cpu_percent": psutil.cpu_percent(interval=1),
                "memory_percent": psutil.virtual_memory().percent,
                "disk_usage": psutil.disk_usage('/').percent
            }

            # Database size
            db_size = self._get_directory_size(self.chroma_path)

            return {
                "database": {
                    "embedding_count": embedding_count,
                    "database_size_mb": round(db_size / (1024 * 1024), 2)
                },
                "dataset": dataset_stats,
                "system": system_stats,
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {"error": str(e)}

    def get_all_videos(self, limit: int = 50, offset: int = 0) -> Dict[str, Any]:
        """Get paginated list of all videos in the database"""
        try:
            if self.db_manager:
                collection = self.db_manager.collection
            else:
                client = chromadb.PersistentClient(path=self.chroma_path)
                collection = client.get_collection(name=self.collection_name)

            # Get all items (this might be inefficient for large datasets)
            results = collection.get(include=['metadatas'])

            videos = []
            for i, metadata in enumerate(results['metadatas']):
                if offset <= i < offset + limit:
                    videos.append({
                        "id": results['ids'][i],
                        "title": metadata.get("title", "N/A"),
                        "channel_title": metadata.get("channel_title", "N/A"),
                        "video_id": metadata.get("video_id", "N/A"),
                        "transcript_length": len(metadata.get("transcript", ""))
                    })

            return {
                "videos": videos,
                "total_count": len(results['metadatas']),
                "limit": limit,
                "offset": offset
            }
        except Exception as e:
            return {"error": str(e)}

    def rebuild_embeddings(self) -> Dict[str, Any]:
        """Rebuild all embeddings from the dataset"""
        try:
            if not os.path.exists(self.dataset_path):
                return {"error": "Dataset file not found"}

            # Load dataset
            df = pd.read_csv(self.dataset_path)
            df = df.dropna(subset=['transcript'])

            # Clear existing collection
            if self.db_manager:
                collection = self.db_manager.collection
                collection.delete(where={})
            else:
                client = chromadb.PersistentClient(path=self.chroma_path)
                try:
                    collection = client.get_collection(name=self.collection_name)
                    collection.delete(where={})
                except:
                    collection = client.create_collection(name=self.collection_name)

            # Prepare data for embedding
            metadatas = []
            ids = []
            texts = []

            for idx, row in df.iterrows():
                video_id = str(row['id'])
                ids.append(video_id)
                metadatas.append({
                    "video_id": video_id,
                    "title": str(row['title']),
                    "channel_title": str(row['channel_title']),
                    "transcript": str(row['transcript'])
                })
                # Combine title and transcript for richer embedding
                texts.append(f"{row['title']} {row['transcript']}")

            # Generate embeddings in batches
            batch_size = 32
            embeddings = []

            for i in range(0, len(texts), batch_size):
                batch_texts = texts[i:i + batch_size]
                batch_embeddings = self._get_model().encode(batch_texts)
                embeddings.extend(batch_embeddings.tolist())

            # Add to collection
            collection.add(
                embeddings=embeddings,
                metadatas=metadatas,
                ids=ids
            )

            return {
                "success": True,
                "message": f"Successfully rebuilt embeddings for {len(ids)} videos",
                "video_count": len(ids)
            }
        except Exception as e:
            return {"error": str(e)}

    def clear_database(self) -> Dict[str, Any]:
        """Clear all data from the ChromaDB collection"""
        try:
            if self.db_manager:
                collection = self.db_manager.collection
                collection.delete(where={})
                return {"success": True, "message": "Database cleared successfully"}
            else:
                client = chromadb.PersistentClient(path=self.chroma_path)
                try:
                    collection = client.get_collection(name=self.collection_name)
                    collection.delete(where={})
                    return {"success": True, "message": "Database cleared successfully"}
                except Exception as e:
                    return {"error": f"Failed to clear database: {str(e)}"}
        except Exception as e:
            return {"error": str(e)}

    def remove_video(self, video_id: str) -> Dict[str, Any]:
        """Remove a specific video from the database"""
        try:
            if self.db_manager:
                collection = self.db_manager.collection
            else:
                client = chromadb.PersistentClient(path=self.chroma_path)
                collection = client.get_collection(name=self.collection_name)

            # Delete the specific video
            collection.delete(ids=[video_id])

            return {"success": True, "message": f"Video {video_id} removed successfully"}
        except Exception as e:
            return {"error": str(e)}

    def export_data(self, export_type: str = "csv") -> Dict[str, Any]:
        """Export current dataset"""
        try:
            if not os.path.exists(self.dataset_path):
                return {"error": "Dataset file not found"}

            df = pd.read_csv(self.dataset_path)

            # Create export filename with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            export_filename = f"data_export_{timestamp}.{export_type}"

            if export_type == "csv":
                df.to_csv(export_filename, index=False)
            elif export_type == "json":
                df.to_json(export_filename, orient="records", indent=2)
            else:
                return {"error": "Unsupported export type. Use 'csv' or 'json'"}

            return {
                "success": True,
                "message": f"Data exported to {export_filename}",
                "file_path": export_filename,
                "record_count": len(df)
            }
        except Exception as e:
            return {"error": str(e)}

    def _get_directory_size(self, path: str) -> int:
        """Get total size of a directory in bytes"""
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(path):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                try:
                    total_size += os.path.getsize(filepath)
                except OSError:
                    pass
        return total_size