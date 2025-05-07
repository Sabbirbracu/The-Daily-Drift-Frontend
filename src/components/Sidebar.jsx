import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menuItems, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-800 text-white transition-all duration-300 p-4 shadow-lg flex flex-col justify-between`}
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
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={index} to={item.path} title={item.label}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-gray-700 hover:text-blue-400"
                  }`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div
        className="mt-6 hover:text-red-400 cursor-pointer flex items-center gap-2"
        onClick={onLogout}
        title="Logout"
      >
        <span>🚪</span>
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
