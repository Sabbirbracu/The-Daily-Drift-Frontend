import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const PostPreviewModal = ({ title, image, content, author, createdAt, id, onClose }) => {
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Cleanup on close
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const displayAuthor = author?.displayName || "Anonymous";
  const displayImage = author?.profileImage;
  const displayDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";


  const getPartialContent = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText;
    return text.slice(0, Math.floor(text.length / 4)) + "...";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto py-10" style={{ zIndex: 9999 }}>
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-6 border dark:border-zinc-700 max-h-[80vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          {title}
        </h2>

        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-lg mb-4"
        />

        {/* Author & Date */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          {displayImage && (
            <img
              src={displayImage}
              alt={displayAuthor}
              className="w-8 h-8 rounded-full object-cover border"
            />
          )}
          <span>
            By <span className="font-medium text-gray-900 dark:text-white">{displayAuthor}</span> · {displayDate}
          </span>
        </div>

        {/* Content Preview */}
        <p className="text-base text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
          {getPartialContent(content)}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            Close
          </button>
          <Link
            to={`/post/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Read Full Post
          </Link>
        </div>
      </div>
    </div>
  );
};

PostPreviewModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string,
    displayName: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  createdAt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default PostPreviewModal;
