import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiMoreVertical, FiShare2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth"; // to get logged-in user
import { useToggleLikeMutation } from "../../features/post/likeApi"; // adjust path if needed

const LatestPostCard = ({ post, showMenu = false }) => {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const { userId } = useAuth() || {}; // safely access userId

  useEffect(() => {
    // Set initial like status
    if (post.likes?.includes(userId)) {
      setLiked(true);
    }
  }, [post.likes, userId]);

  const handleLike = async () => {
    if (!userId) return alert("Please log in to like posts.");

    try {
      await toggleLike(post._id).unwrap();
      // Optimistically update UI
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative">
      {showMenu && (
        <div className="absolute top-2 right-2 text-white cursor-pointer">
          <FiMoreVertical />
        </div>
      )}

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

        <div className="flex justify-start space-x-3 text-gray-400 text-sm items-center">
          <Link to={`/post/${post._id}`} className="hover:text-white">
            💬 {post.comments?.length || 0} Comments
          </Link>

          <button
            onClick={handleLike}
            disabled={isLoading}
            className="flex items-center space-x-1 hover:text-red-400 transition"
          >
            <FaHeart className={`transition-transform ${liked ? "scale-125 text-red-500" : ""}`} />
            <span>{likes} Likes</span>
          </button>

          <span>👁️ {post.views || 0} Views</span>

          <button onClick={toggleModal} className="flex items-center space-x-1 hover:text-blue-400">
            <FiShare2 />
            <span>Share</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md text-black w-[90%] max-w-md">
            <h4 className="text-lg font-semibold mb-2">Share this post</h4>
            <input
              type="text"
              value={`${window.location.origin}/post/${post._id}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end mt-3">
              <button onClick={toggleModal} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestPostCard;
