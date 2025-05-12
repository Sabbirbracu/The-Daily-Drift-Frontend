import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const adminMenuItems = [
  { label: "Dashboard", path: "/dashboard-admin", icon: "📊" },
  { label: "Users", path: "/dashboard-admin/users", icon: "👥" },
  { label: "Posts", path: "/dashboard-admin/posts", icon: "📝" },
  { label: "Profile", path: "/dashboard-admin/profile", icon: "🙍‍♂️" },
];

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={adminMenuItems} />
      <main className="flex-1 p-6 bg-gray-500">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
