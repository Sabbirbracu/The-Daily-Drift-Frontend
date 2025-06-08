import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="border-t border-gray-700 py-4 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} The Daily Drift. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-lg">
            <a href="https://www.facebook.com/sabbir.ahmad.443854/" className="hover:text-white" target="blank"><FaFacebookF /></a>
            <a href="https://www.instagram.com/sabbir3135/" className="hover:text-white" target="blank"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/sabbirahmad653/" className="hover:text-white" target="blank"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
