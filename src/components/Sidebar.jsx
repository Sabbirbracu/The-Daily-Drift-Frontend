
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ menuItems, isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const getUrl = (label) =>
    label.toLowerCase() === "dashboard"
      ? "/dashboard-user"
      : `/dashboard-user/${label.toLowerCase()}`;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/home");
  };

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen p-4`}

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
      {/* Top Section: Logo + Menu */}
      <div>
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center mb-4">
              <Link
                to={getUrl(item.label)}
                className="flex items-center text-white"
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-400 px-3 py-2 rounded-lg mb-6 cursor-pointer"
        >
          <span className=" flex items-center justify-center space-x-1">
            <RiLogoutBoxLine />
            {!isCollapsed && <span>Logout</span>}
          </span>
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
    </div>
  );
};

export default Sidebar;
