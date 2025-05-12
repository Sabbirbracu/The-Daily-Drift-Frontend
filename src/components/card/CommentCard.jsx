import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const CommentCard = ({ comment }) => {
  const authorName = comment?.author?.name || "Anonymous";

  return (
    <div className="flex items-start gap-3 mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
      {/* Avatar or fallback icon */}
      <div className="flex-shrink-0">
        <FaUserCircle className="text-4xl text-gray-400" />
      </div>

      <div>
        {/* Author name */}
        <h4 className="text-sm font-semibold text-white">{authorName}</h4>

        {/* Comment text */}
        <p className="text-sm text-gray-300 mt-1">{comment?.content}</p>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default CommentCard;
