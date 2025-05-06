import PropTypes from "prop-types";

const PostCard = ({ title, image, content, category }) => {
  const defaultImage = "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <div
      className="relative rounded-xl border-2 border-red-500 overflow-hidden shadow-md bg-cover bg-center transform hover:scale-105 transition duration-300"
      style={{
        backgroundImage: `url(${image || defaultImage})`,
        minHeight: "200px",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text content */}
      <div className="relative z-10 p-4 text-white">
        <p className="text-xs text-red-400 font-semibold mb-1">{category}</p>

        <h2 className="text-2xl font-bold mb-2 line-clamp-2">{title}</h2>

        {content && (
          <p className="text-sm text-gray-200 line-clamp-2">{content}</p>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  category: PropTypes.string.isRequired,
};

export default PostCard;
