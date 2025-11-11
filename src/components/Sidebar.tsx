export default function Sidebar() {
  const menus = [
    { name: "My Day", icon: "☀️" },
    { name: "Important", icon: "⭐" },
    { name: "Planned", icon: "📅" },
    { name: "All", icon: "📋" },
    { name: "Assigned to me", icon: "👤" },
  ];

  return (
    <aside className="w-64 bg-neutral-900 text-gray-200 min-h-screen flex flex-col p-4 border-r border-neutral-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-100"> Microsoft To Do</h2>
      <nav>
        {menus.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-2 py-2 px-3 rounded-md hover:bg-neutral-800 transition"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
