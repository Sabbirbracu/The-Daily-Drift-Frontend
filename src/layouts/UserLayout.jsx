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

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar menuItems={menuItems} />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;