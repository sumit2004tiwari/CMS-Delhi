"use client";
import { useState, useEffect } from "react";
import { createHeroSection, updateHeroSection } from "../../../../../api/hero/hero.js";

const HeroBlockModal = ({ onClose, onSuccess, editingBlock }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(""); // ✅ preview URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form on edit
  useEffect(() => {
    if (editingBlock) {
      setTitle(editingBlock.title);
      if (editingBlock.image) {
  setPreview(editingBlock.image); // use directly, no extra localhost
}

    }
  }, [editingBlock]);

  // Cleanup URL objects when unmounting
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ✅ Instant preview replacement
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cleanup old blob URL if exists
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file)); // show new image immediately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setError("Not authorized");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      if (image) formData.append("image", image);

      let savedBlock;
      if (editingBlock) {
        savedBlock = await updateHeroSection(editingBlock._id, formData, token);
      } else {
        savedBlock = await createHeroSection(formData, token);
      }

      onSuccess(savedBlock, !!editingBlock);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save block");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl text-black font-bold mb-4">
          {editingBlock ? "Edit Hero Section" : "Add Hero Section"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-black border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
         
          

          {/* ✅ Instant preview */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded border"
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroBlockModal;
