const LatestPostCard = ({ post }) => {
  if (!post) return null;

  const postId = post._id || post.id;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {post?.title || "Untitled Post"}
      </h3>
      <p className="text-gray-600">
        {post?.description || "No description available."}
      </p>
    </div>
  );
};

export default LatestPostCard;
