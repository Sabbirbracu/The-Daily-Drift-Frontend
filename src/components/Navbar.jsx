import debounce from "lodash.debounce"; // ✅ import debounce
import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ".././index.css";
import MobileNavItem from "./MobileNavItem";
import NavItem from "./NavItem";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const categories = ["home", "about", "contact"];

  // ✅ Debounced navigation
  const debouncedSearch = useCallback(
    debounce((value) => {
      navigate(`/posts?search=${encodeURIComponent(value.trim())}`);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <nav className="bg-gray-900 text-white py-2.5 content-font sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="text-sm lg:text-3xl font-bold primary-font">
          The Daily Drift
        </Link>

        {/* Search bar (desktop) */}
        <div className="flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleChange}
            className="w-48 sm:w-72 md:w-80 lg:w-full max-w-md px-3 py-1 rounded-md text-gray-500 placeholder-gray-500 focus:outline-none ring-1 ring-gray-500"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <NavItem categories={categories} />
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <MobileNavItem categories={categories} setMenuOpen={setMenuOpen} />
      )}
    </nav>
  );
};

export default Navbar;
