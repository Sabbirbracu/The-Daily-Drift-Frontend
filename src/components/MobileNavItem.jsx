import { useEffect, useRef, useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const MobileNavItem = ({ categories, setMenuOpen }) => {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  const getUrl = (category) =>
    category.toLowerCase() === "home" ? "/" : `/${category.toLowerCase()}`;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (query) {
      navigate(`/posts?search=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lg:hidden fixed inset-0 bg-gray-900 text-white z-50 overflow-y-auto px-6 pt-10 animate-slide-in">
      {/* Close Button */}
      <div className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-400 transition">
        <FaTimes onClick={() => setMenuOpen(false)} />
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-yellow-400 hover:text-yellow-300 transition"
          onClick={() => setMenuOpen(false)}
        >
          The Daily Drift
        </Link>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-xs px-4 py-2 rounded-md bg-transparent text-white placeholder-white focus:outline-none ring-1 ring-gray-400"
        />
      </form>


      {/* Navigation Links */}
      <ul className="space-y-6 text-center text-lg font-semibold">
        {categories.map((category) => (
          <li key={category} onClick={() => setMenuOpen(false)}>
            <Link
              to={getUrl(category)}
              className="hover:text-red-400 transition duration-200"
            >
              {category}
            </Link>
          </li>
        ))}

        {/* User Menu */}
        <li className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center gap-2 text-2xl cursor-pointer hover:text-red-400 transition"
              >
                <FaUserCircle />
                <span className="text-base">{user.displayName || "Profile"}</span>
              </div>

              {dropdownOpen && (
                <ul className="mt-4 space-y-3 bg-white text-black rounded-lg shadow-lg py-4 w-full max-w-xs mx-auto">
                  {[
                    {
                      label: "Dashboard",
                      to: `/${user.role === "admin" ? "dashboard-admin" : "dashboard-user"}`,
                    },
                    { label: "Create Post",to:`/dashboard-${user.role.toLowerCase()}/create-post`},
                    { label: "User Profile", to: `/dashboard-${user.role}/profile` },
                  ].map(({ label, to }) => (
                    <li key={label} className="hover:bg-gray-100 px-4 py-2 rounded">
                      <Link
                        to={to}
                        onClick={() => {
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                  <li
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/");
                    }}
                    className="text-red-500 hover:bg-red-100 px-4 py-2 rounded cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-block bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 text-sm font-semibold transition"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MobileNavItem;
