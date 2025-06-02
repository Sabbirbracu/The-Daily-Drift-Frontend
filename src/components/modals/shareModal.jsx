import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ShareModal = ({ url, onClose }) => {
  const copyLink = () => {
    if (!url) {
      toast.error("Invalid link.");
      return;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link."));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-md border border-zinc-200 dark:border-zinc-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Share this Post
        </h2>

        {/* Link Box */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            readOnly
            value={url || ""}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={copyLink}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Copy
          </button>
        </div>

        {/* Social Sharing */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
          Or share directly:
        </p>

        <div className="flex justify-center gap-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 hover:text-blue-800 transition-transform duration-200"
            title="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:scale-110 hover:text-sky-700 transition-transform duration-200"
            title="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:scale-110 hover:text-green-700 transition-transform duration-200"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareModal;
