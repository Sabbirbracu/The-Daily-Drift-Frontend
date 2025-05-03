import React from "react";
import { Link } from "react-router-dom";
const MobileNavItem = ({ categories }) => {
  return (
    <>
      <ul className="md:hidden mt-4 space-y-5 text-center">
        {categories.map((category) => (
          <li
            key={category}
            className="hover:text-red-500 cursor-pointer transition"
          >
            {category}
          </li>
        ))}
        <li className="hover:text-red-500 cursor-pointer transition">
          Contact Us
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </>
  );
};

export default MobileNavItem;
