import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
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
    <div className="flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="">
        <Sidebar menuItems={menuItems} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-500">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
