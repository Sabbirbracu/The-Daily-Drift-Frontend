import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const MobileNavItem = ({ categories }) => {
  const { userId, userRole } = useAuth() || {};

  return (
    <ul className="lg:hidden mt-4 space-y-5 text-center">
      {categories.map((category) => (
        <li
          key={category}
          className="hover:text-red-400 cursor-pointer transition text-sm md:text-base"
        >
          <Link to={`/${category.toLowerCase()}`}>{category}</Link>
        </li>
      ))}

      <li className="hover:text-red-400 cursor-pointer transition text-sm md:text-base">
        {userId ? (
          <Link
            to={userRole === "admin" ? "/dashboard-admin" : "/dashboard-user"}
          >
            <FaUserCircle className="text-2xl" />
          </Link>
        ) : (
          <Link
            className="bg-red-400 text-white text-sm sm:text-base px-4 py-2"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </li>
    </ul>
  );
};

export default MobileNavItem;
