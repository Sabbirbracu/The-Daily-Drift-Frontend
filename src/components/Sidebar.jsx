import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const Sidebar = ({ menuItems, isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-4 bg-gray-800 text-white p-4 shadow-lg flex-col justify-between">
        <nav className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={index} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                    isActive ? "bg-blue-600 font-semibold" : "hover:bg-gray-700 hover:text-blue-400"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-y-0 left-0 w-64 z-40 bg-gray-900 text-white shadow-lg p-4 animate-slide-in-left overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white hover:text-red-400 transition"
              aria-label="Close Sidebar"
            >
              <IoClose />
            </button>
          </div>

          <nav className="space-y-5">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-lg ${
                    isActive ? "bg-blue-600 font-semibold" : "hover:bg-gray-700 hover:text-blue-400"
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-6 w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
