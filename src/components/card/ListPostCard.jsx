import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListPostCard = ({ id, title, image, category, createdAt }) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="flex items-start gap-3">
      {/* Link on image */}
      <Link to={`/post/${id}`}>
        <img
          src={image || defaultImage}
          alt={title}
          className="w-14 h-14 object-cover rounded-md"
        />
      </Link>

      <div className="flex-1">
        <p className="text-xs text-red-400 font-semibold">{category}</p>

        {/* Link on title */}
        <Link to={`/post/${id}`}>
          <h4 className="text-sm font-semibold leading-tight line-clamp-2 hover:underline">
            {title}
          </h4>
        </Link>

        <p className="text-xs text-gray-400 mt-1">
          •{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
};

ListPostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ListPostCard;
