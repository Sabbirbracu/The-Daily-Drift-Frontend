import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../features/auth/hooks/useAuth";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard-user" },
    { icon: "👤", label: "Profile", path: "/dashboard-user/profile" },
    { icon: "📝", label: "Post", path: "/dashboard-user/post" },
  ];

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Mobile: Open Sidebar Button (small and neat) */}
      <div className="lg:hidden px-4 py-2 bg-gray-800 shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
        >
          📋 Menu
        </button>
      </div>

      <div className="flex flex-1">
        <Sidebar menuItems={menuItems} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 p-4 bg-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
