import { Menu, X } from "lucide-react"; // Lucide icons for menu and close
import { useState } from "react";
import ".././index.css";
import MobileNavItem from "./MobileNavItem";
import NavItem from "./NavItem";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = [
    "Movies",
    "Games",
    "Tech",
    "Sports",
    "News",
    "Music",
    "Art",
    "Food",
  ];

  return (
    <nav className=" bg-gray-900 text-white py-2.5 content-font">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-sm lg:text-3xl font-bold primary-font">
          The Daily Drift
        </h2>

        {/* Desktop Menu */}
        <NavItem categories={categories} />

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && <MobileNavItem categories={categories} />}
    </nav>
  );
};

export default Navbar;
