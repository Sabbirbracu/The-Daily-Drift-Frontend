import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../features/auth/hooks/useAuth";

const NavItem = ({ categories }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getUrl = (category) => {
    return category.toLowerCase() === "home"
      ? "/"
      : `/${category.toLowerCase()}`;
  };

  const isActive = (path) => pathname === path;

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

      <li
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        {user ? (
          <button className="text-white text-2xl hover:text-red-400 transition">
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
          <ul className="absolute top-10 right-0 bg-white text-black shadow-lg py-2 rounded w-40 z-50">
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link
                to={
                  user.role === "admin" ? "/dashboard-admin" : "/dashboard-user"
                }
              >
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to="/create-post">Create Post</Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to="/profile">User Profile</Link>
            </li>
            <li className="hover:bg-gray-200 px-4 py-2">
              <Link to="/settings">Settings</Link>
            </li>
            <li
              className={`hover:bg-red-100 px-4 py-2 ${
                isActive("/logout")
                  ? "text-red-600 font-semibold"
                  : "text-red-500"
              }`}
            >
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
