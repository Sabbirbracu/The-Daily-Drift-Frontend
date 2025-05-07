import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "👤", label: "Profile" },
    { icon: "📝", label: "Post" },
    { icon: "📈", label: "Analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar
        menuItems={menuItems}
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />

      <main className="flex-1 p-6 bg-gray-700">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
