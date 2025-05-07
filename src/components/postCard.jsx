import PropTypes from "prop-types";

const PostCard = ({ title, image, content, category }) => {
  const defaultImage = "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="relative rounded-xl border-2 overflow-hidden shadow-md bg-cover bg-center transform hover:scale-105 transition duration-300"
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
