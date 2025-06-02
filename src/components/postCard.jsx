import { Eye, Share2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostPreviewModal from "./modals/PostPreviewModal";
import ShareModal from "./modals/shareModal";

const PostCard = ({ id, title, image, content, category, author, createdAt, onPreview }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const defaultImage =
    "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const displayAuthor = author ? author.displayName : "Anonymous";

  const displayDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <>
      <div
        className="relative group h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-cover bg-center border"
        style={{ backgroundImage: `url(${image || defaultImage})` }}
      >
        {/* Dim background overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

        {/* Category Chip */}
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
          {/* Title */}
          <div className="mt-auto">
            <Link to={`/post/${id}`}>
              <h2 className="text-xl font-bold text-white drop-shadow-md hover:underline line-clamp-2">
                {title}
              </h2>
            </Link>
          </div>

          {/* Footer: Author + Buttons */}
          <div className="flex justify-between items-center text-sm text-gray-200 mt-4">
            <div>
              <p>
                By <span className="font-medium text-white">{displayAuthor}</span>
              </p>
              <p>{displayDate}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                title="Preview"
                onClick={() => onPreview ? onPreview() : setShowPreviewModal(true)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                title="Share"
                onClick={() => setShowShareModal(true)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          url={`${window.location.origin}/post/${id}`}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <PostPreviewModal
          id={id}
          title={title}
          image={image || defaultImage}
          content={content}
          author={author}
          createdAt={createdAt}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </>
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
  onPreview: PropTypes.func,
};

export default PostCard;
