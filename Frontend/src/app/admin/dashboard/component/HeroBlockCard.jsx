'use client';

const HeroBlockCard = ({ block, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-gray-700 mb-1">{block.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{block.description}</p>
      <img
        src={block.imageUrl}
        alt="Block"
        className="w-full h-40 object-cover rounded mb-2"
      />
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
          onClick={() => onEdit(block)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          onClick={() => onDelete(block._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HeroBlockCard;
