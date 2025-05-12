import { Share2 } from "lucide-react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, image, content, category, author, createdAt }) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const displayAuthor = author || "Anonymous";
  const displayDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";

  const handleShare = (e) => {
    e.stopPropagation(); // prevent link navigation
    const url = `${window.location.origin}/post/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success("Post link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy the link."));
  };

  return (
    <Link
      to={`/post/${id}`}
      className="relative rounded-xl border-2 overflow-hidden shadow-md bg-cover bg-center transform hover:scale-105 transition duration-300 flex flex-col justify-between"
      style={{
        backgroundImage: `url(${image || defaultImage})`,
        minHeight: "370px",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text content */}
      <div className="relative z-10 p-4 text-white">
        <p className="text-xs text-red-400 font-semibold mb-1">{category}</p>
        <h2 className="text-2xl font-bold mb-2 line-clamp-2 hover:underline">{title}</h2>
        {content && (
          <p className="text-sm text-gray-200 line-clamp-2">{content}</p>
        )}
      </div>

      {/* Footer: Author, Date, Share */}
      <div className="relative z-10 p-4 mt-auto text-sm text-gray-300 flex items-center justify-between bg-black/40 backdrop-blur-sm">
        <div>
          <p>
            By <span className="text-white font-medium">{displayAuthor}</span>
          </p>
          <p>{displayDate}</p>
        </div>

        <button
          title="Copy post link"
          className="p-2 rounded-full hover:bg-white/20 transition"
          onClick={handleShare}
        >
          <Share2 className="text-white w-5 h-5" />
        </button>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  category: PropTypes.string.isRequired,
  author: PropTypes.string,
  createdAt: PropTypes.string,
};

export default PostCard;
