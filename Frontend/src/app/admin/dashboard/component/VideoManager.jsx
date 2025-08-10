"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const VideoManager = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("/sample-video.mp4"); // default fallback
  console.log(videoUrl, "videoUrl");
  const [loading, setLoading] = useState(false);

  // Fetch current video from backend on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/video")
      .then((res) => {
        if (res.data?.url) {
          // If stored video is local, build full URL
          const fullUrl = res.data.isLocal
            ? `${res.data.url.replace(/\\/g, "/")}`
            : res.data.url;
          setVideoUrl(fullUrl);
        }
      })
      .catch(() => {});
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming token is stored
          },
        }
      );

      // Update preview
      const fullUrl = res.data.isLocal
        ? `${res.data.url.replace(/\\/g, "/")}`
        : res.data.url;
      setVideoUrl(fullUrl);
      setVideoFile(null);
      alert("Video updated successfully");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        🎥 Background Video
      </h2>

      <div className="space-y-4">
        <video
          src={videoUrl}
          controls
          className="w-full h-auto rounded-lg border object-cover"
        />

        <input
          type="file"
          accept="video/*"
          className="block text-black w-full"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload / Update Video"}
        </button>
      </div>
    </motion.section>
  );
};

export default VideoManager;
