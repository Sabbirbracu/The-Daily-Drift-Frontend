import PropTypes from "prop-types";

const ListPostCard = ({ title, image, category, createdAt }) => {
  return (
    <div className="flex items-start gap-3">
      <img
        src={image}
        alt={title}
        className="w-14 h-14 object-cover rounded-md"
      />
      <div className="flex-1">
        <p className="text-xs text-red-400 font-semibold">{category}</p>
        <h4 className="text-sm font-semibold leading-tight line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">
          • {new Date(createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
};

ListPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ListPostCard;
