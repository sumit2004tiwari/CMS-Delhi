const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6 text-blue-600 font-bold text-xl border-b">Admin Panel</div>
      <nav className="p-4 space-y-2 text-gray-700">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 font-medium">
          🎥 Background Video
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 font-medium">
          📝 Hero Text & Images
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 font-medium">
          ⚙️ Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
