import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/Auth";
const MobileNavItem = ({ categories }) => {
  const navigate = useNavigate();
  const handleLogut = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <>
      <ul className="lg:hidden mt-4 space-y-5 text-center">
        {categories.map((category) => (
          <li
            key={category}
            className="hover:text-red-400 cursor-pointer transition text-sm md:text-base"
          >
            {category}
          </li>
        ))}
        <li className="hover:text-red-400 cursor-pointer transition text-sm md:text-base">
          Contact Us
        </li>
        <li className="bg-red-400 py-2 px-4 rounded-lg">
          {!useAuth() ? (
            <Link to={"/login"}>Login</Link>
          ) : (
            <button onClick={handleLogut}>Logout</button>
          )}
        </li>
      </ul>
    </>
  );
};

export default MobileNavItem;
