import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center justify-center px-6 text-center">
      <img
        src="https://illustrations.popsy.co/gray/error-404.svg"
        alt="404 Not Found"
        className="w-full max-w-xs sm:max-w-md md:max-w-lg mb-8"
      />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Oops! Page not found</h1>
      <p className="text-gray-400 mb-6 text-base sm:text-lg">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
      >
        <FaArrowLeft /> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
