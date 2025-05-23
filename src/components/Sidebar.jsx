import { Link, useLocation } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const Sidebar = ({ menuItems }) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 h-screen sticky top-4 bg-gray-800 text-white p-4 shadow-lg flex flex-col justify-between">
      <div>
        {/* Menu Items */}
        <nav className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={index} to={item.path} title={item.label}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-gray-700 hover:text-blue-400"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div
        className="mt-6 hover:text-red-400 cursor-pointer flex items-center gap-2"
        onClick={logout}
        title="Logout"
      >
        <span>🚪</span>
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
