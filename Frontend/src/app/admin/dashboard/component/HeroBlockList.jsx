"use client";
import { useState, useEffect } from "react";
import HeroBlockModal from "./HeroBlockModal";
import axios from "axios";
import Swal from "sweetalert2";

const HeroBlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/hero-sections").then((res) => {
      setBlocks(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("admin_token");

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the hero section.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/hero-sections/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setBlocks((prev) => prev.filter((block) => block._id !== id));

          Swal.fire("Deleted!", "Hero section has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", err.response?.data?.message || "Failed to delete", "error");
        }
      }
    });
  };

  const handleSuccess = (block, isEdit) => {
    if (isEdit) {
      setBlocks((prev) => prev.map((b) => (b._id === block._id ? block : b)));
    } else {
      setBlocks((prev) => [...prev, block]);
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#8729FB]">📝 Hero Blocks</h2>
        <button
          onClick={() => {
            setEditingBlock(null);
            setModalOpen(true);
          }}
          className="bg-[#8729FB] text-white px-4 py-2 rounded"
        >
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blocks.map((block) => (
          <div key={block._id} className="border p-4 rounded">
            <img
              src={block.image}
              alt={block.title}
              className="w-full  h-40 object-cover rounded"
            />
            <h3 className="font-bold text-[#8729FB] mt-2">{block.title}</h3>
            {/* <p className="text-sm">{block.description}</p> */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setEditingBlock(block);
                  setModalOpen(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(block._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <HeroBlockModal
          editingBlock={editingBlock}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
};

export default HeroBlockList;
