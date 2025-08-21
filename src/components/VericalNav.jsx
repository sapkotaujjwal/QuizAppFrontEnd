import { Home, Settings, BarChart2 } from "lucide-react";

function VerticalNav({ page, onSelect }) {
  const navItems = [
    { id: "Info", icon: <Home className="w-5 h-5" />, label: "Info" },
    { id: "Tools", icon: <BarChart2 className="w-5 h-5" />, label: "Tools" },
    { id: "Settings", icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

  return (
    <div className="w-[9rem] lg:w-60 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col">


      <nav className="flex-1 px-4 py-6 space-y-2 text-gray-700">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect(item.id);
            }}
            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-gray-700 text-sm font-medium transition-colors ${
              page === item.id ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export default VerticalNav;