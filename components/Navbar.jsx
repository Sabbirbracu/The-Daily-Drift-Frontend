import { Menu, X } from "lucide-react"; // Lucide icons for menu and close
import { useState } from "react";
import Button from "./Button";
import "/Users/sabbirahmad/The Daily Drift/frontend/src/index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ["Movies", "Games", "Tech", "Sports", "News", "Music", "Art", "Food"];

  return (
    <nav className="bg-gray-700 text-white py-2.5 px-7 content-font">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold primary-font">The Daily Drift</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {categories.map((category) => (
            <li key={category} className="hover:text-red-500 cursor-pointer transition">
              {category}
            </li>
          ))}
          <li className="hover:text-red-500 cursor-pointer transition">Contact Us</li>
          <Button label="Login" onClick={() => alert("Login clicked")} className="HeaderButton" />
        </ul>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3">
          {categories.map((category) => (
            <li key={category} className="hover:text-red-500 cursor-pointer transition">
              {category}
            </li>
          ))}
          <li className="hover:text-red-500 cursor-pointer transition">Contact Us</li>
          <Button label="Login" onClick={() => alert("Login clicked")} className="HeaderButton" />
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
