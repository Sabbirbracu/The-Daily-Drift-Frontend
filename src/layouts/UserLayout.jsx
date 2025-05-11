import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/ProfileMenu";
import useAuth from "../features/auth/hooks/useAuth";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard-user" },
    { icon: "👤", label: "Profile", path: "/dashboard-user/profile" },
    { icon: "📝", label: "Post", path: "/dashboard-user/post" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Optionally, show nothing or a loader while redirecting
  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* ✅ Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow">
        <h1 className="text-2xl font-bold">The Daily Drift</h1>

        {/* 👤 Profile menu at top right */}
        <ProfileMenu />
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar without the logout button */}
        <Sidebar menuItems={menuItems} />
        <div className="flex bg-gray-900 text-white">
          {/* Sidebar */}
          <div className="">
            {/* Sidebar without the logout button */}
            9cea75187eeae6f5d62eb67c4ec0cab74a4e6162
            <Sidebar menuItems={menuItems} />
          </div>
          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-500">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
