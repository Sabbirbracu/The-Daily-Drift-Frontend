import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const NavItem = ({ categories }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getUrl = (category) => {
    return category.toLowerCase() === "home"
      ? "/"
      : `/${category.toLowerCase()}`;
  };

  const isActive = (path) => pathname === path;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul className="py-3 hidden lg:flex gap-6 items-center relative">
      {categories.map((category) => (
        <li
          key={category}
          className={`hover:text-red-400 transition text-sm md:text-base capitalize relative ${
            isActive(getUrl(category))
              ? "text-blue-500 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-500"
              : ""
          }`}
        >
          <Link to={getUrl(category)}>{category}</Link>
        </li>
      ))}

      <li className="relative" ref={dropdownRef}>
        {user ? (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-2xl hover:text-red-400 transition"
          >
            <FaUserCircle />
          </button>
        ) : (
          <Link
            className="red-button rounded-3xl text-white text-sm sm:text-base px-4 py-1"
            to="/login"
          >
            Login
          </Link>
        )}

        {user && dropdownOpen && (
          <ul className="absolute top-9 right-0 bg-white text-black shadow-lg py-2 rounded w-40 z-50">
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link
                to={user.role === "admin" ? "/dashboard-admin" : "/dashboard-user"}
              >
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to="/dahboard-user/create-post">Create Post</Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to={`/dashboard-${user.role}/profile`}>User Profile</Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to={`/dashboard-${user.role}/settings`}>Settings</Link>
            </li>
            <li
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={`hover:bg-red-100 px-4 py-2 cursor-pointer ${
                isActive("/logout")
                  ? "text-red-600 font-semibold"
                  : "text-red-500"
              }`}
            >
              Logout
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
