import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
const NavItem = ({ categories }) => {
  const getUrl = (category) => {
    if (category.toLowerCase() === "home") return "/";
    return `/${category.toLowerCase()}`;
  };

  const { userRole } = useAuth() || {};
  return (
    <>
      <ul className="hidden lg:flex gap-6 items-center">
        {categories.map((category) => (
          <li
            key={category}
            className="hover:text-red-400 cursor-pointer transition text-sm md:text-base capitalize"
          >
            <Link to={getUrl(category)}>{category}</Link>
          </li>
        ))}
        <li className="hover:text-red-400 cursor-pointer transition text-sm md:text-base capitalize">
          {useAuth() ? (
            <Link
              to={userRole === "admin" ? "/dashboard-admin" : "/dashboard-user"}
            >
              <FaUserCircle className="text-2xl" />
            </Link>
          ) : (
            <Link
              className="bg-red-400 rounded-3xl text-white text-sm sm:text-base px-4 py-1"
              to={"/login"}
            >
              login
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavItem;
