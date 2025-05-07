import PropTypes from "prop-types";

const FeatureCard = ({ post }) => {
  return (
    <div className="flex gap-4 items-center group cursor-pointer hover:opacity-90 transition">
      <img
        src={post.image}
        alt={post.title}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="text-white">
        <p className="text-xs text-red-400 font-semibold">{post.category}</p>
        <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-red-300">
          {post.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">
          ● {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long" })}
        </p>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FeatureCard;
