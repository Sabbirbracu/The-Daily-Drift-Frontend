import { Menu, X } from "lucide-react"; // Lucide icons for menu and close
import { useState } from "react";
import { Link } from "react-router-dom";
import ".././index.css";
import MobileNavItem from "./MobileNavItem";
import NavItem from "./NavItem";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ["Home", "Blog", "Contact Us"];

  return (
    <nav className=" bg-gray-900 text-white py-2.5 content-font ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={"/home"}
          className="text-sm lg:text-3xl font-bold primary-font"
        >
          The Daily Drift
        </Link>

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
