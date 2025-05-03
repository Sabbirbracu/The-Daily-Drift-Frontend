import React from "react";
import { Link } from "react-router-dom";
const NavItem = ({ categories }) => {
  return (
    <>
      <ul className="hidden md:flex gap-6 items-center">
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

export default NavItem;
