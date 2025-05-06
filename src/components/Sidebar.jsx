import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const getUrl = (label) => {
    return label.toLowerCase() === "dashboard"
      ? "/dashboard-user"
      : `/dashboard-user/${label.toLowerCase()}`;
  };

  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center text-white mb-4">
            <Link
              to={getUrl(item.label)}
              className="flex items-center text-white"
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
