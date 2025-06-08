import { useEffect, useState } from "react";
import { IoMdApps } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../features/auth/hooks/useAuth";

const adminMenuItems = [
  { label: "Dashboard", path: "/dashboard-admin", icon: "📊" },
  { label: "Users", path: "/dashboard-admin/users", icon: "👥" },
  { label: "Posts", path: "/dashboard-admin/posts", icon: "📝" },
  { label: "Profile", path: "/dashboard-admin/profile", icon: "🙍‍♂️" },
  { label: "Category", path: "/dashboard-admin/category", icon: "📂" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Mobile: Open Sidebar Button */}
      <div className="lg:hidden px-4 py-2 bg-gray-800 shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
        >
          <IoMdApps className="text-lg" />
          Admin Menu
        </button>
      </div>

      <div className="flex flex-1">
        <Sidebar menuItems={adminMenuItems} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 p-4 bg-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
