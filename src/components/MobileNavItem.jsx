import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const MobileNavItem = ({ categories }) => {
  const { user } = useAuth() || {};
  const getUrl = (category) => {
    if (category.toLowerCase() === "home") return "/";
    return `/${category.toLowerCase()}`;
  };

  return (
    <ul className="lg:hidden min-h-screen mt-4 space-y-5 text-center ">
      {categories.map((category) => (
        <li
          key={category}
          className="hover:text-red-400 cursor-pointer transition text-sm md:text-base"
        >
          <Link to={getUrl(category)}>{category}</Link>
        </li>
      ))}

      <li className=" flex justify-center  hover:text-red-400 cursor-pointer transition text-sm md:text-base">
        {user ? (
          <Link
            to={user.role === "admin" ? "/dashboard-admin" : "/dashboard-user"}
          >
            <FaUserCircle className="text-2xl" />
          </Link>
        ) : (
          <Link
            className="bg-red-400 rounded-3xl text-white text-sm sm:text-base px-4 py-1"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </li>
    </ul>
  );
};

export default MobileNavItem;
