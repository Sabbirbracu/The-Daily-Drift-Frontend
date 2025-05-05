import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-800 transition-all duration-300 p-4 shadow-lg flex flex-col justify-between`}
    >
      <div>
        {/* Toggle button */}
        <button
          className="mb-6 self-end"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu /> : <X />}
        </button>

        {/* Menu Items */}
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="hover:text-blue-400 cursor-pointer flex items-center gap-3"
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div
        className="mt-6 hover:text-red-400 cursor-pointer flex items-center gap-2"
        onClick={() => alert("Logging out...")}
      >
        <span>🚪</span>
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
