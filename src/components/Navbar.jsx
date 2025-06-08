import debounce from "lodash.debounce";
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
    <nav className="bg-gray-900 text-white py-3 content-font sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo - Bigger */}
        <Link
          to={"/"}
          className="text-2xl sm:text-4xl lg:text-4xl font-bold primary-font text-yellow-400 hover:text-yellow-300 transition"
        >
          The Daily Drift
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden sm:flex flex-1 justify-center px-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleChange}
            className="w-full max-w-xs px-4 py-2 rounded-md bg-transparent text-white placeholder-white focus:outline-none ring-1 ring-gray-400"
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
