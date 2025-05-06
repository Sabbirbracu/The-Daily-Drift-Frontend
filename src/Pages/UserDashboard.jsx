import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Adjust the path if needed

const UserDashboard = () => {
  const menuItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "👤", label: "Profile" },
    { icon: "📝", label: "Post" },
    { icon: "📈", label: "Analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
