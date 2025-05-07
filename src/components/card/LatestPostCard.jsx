const LatestPostCard = ({ post }) => {
    return (
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <img
          src={post.image || "/default.jpg"}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-white">
          <div className="text-sm text-gray-400 flex justify-between mb-2">
            <span className="uppercase">{post.category || "General"}</span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>💬 {post.comments?.length || 0} Comments</span>
            <span>❤️ {post.likes || 0} Likes</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default LatestPostCard;
  