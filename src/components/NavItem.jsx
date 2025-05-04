import React from "react";
import { Link } from "react-router-dom";
const NavItem = ({ categories }) => {
  return (
    <>
      <ul className="hidden lg:flex gap-6 items-center">
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
        <li>
          <Link to={"/login"} className="bg-red-400 py-2 px-4 rounded-lg">
            Login
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavItem;
