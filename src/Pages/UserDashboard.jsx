import React from "react";
import Sidebar from "../components/Sidebar";
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
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to your Dashboard
        </h1>
        <div className="bg-gray00 p-6 rounded-lg shadow">
          <p>This is the main content area in dark mode.</p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
