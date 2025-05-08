import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../features/auth/hooks/useAuth";
const UserDashboard = () => {
  const navigate = useNavigate();
  const { userId } = useAuth() || {};
  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard-user" },
    { icon: "👤", label: "Profile", path: "/dashboard-user/profile" },
    { icon: "📝", label: "Post", path: "/dashboard-user/post" },
  ];

  if (!userId) return navigate("/");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-500">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
