import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth";
import { useToggleLikeMutation } from "../../features/post/likeApi";
import { useDeletePostMutation } from "../../features/post/postApi";

const LatestPostCard = ({ post, showMenu = false }) => {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const { user } = useAuth();
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post.likes, user?.id]);

  const handleLike = async () => {
    if (!user?.id) {
      return navigate("/login"); // redirect to login if not logged in
    }

    try {
      await toggleLike(post._id).unwrap();
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const toggleModal = () => {
    if (!user?.id) return navigate("/login"); // redirect to login if not logged in
    setShowModal((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const result = await deletePost(post._id).unwrap();
      console.log("Post deleted:", result);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative group">
      {showMenu && user?.role && (
        <div className="hidden group-hover:flex transition-all duration-700 absolute top-2.5 left-2.5 space-x-2.5">
          <button className="bg-yellow-400 px-4 py-2 rounded-md cursor-pointer">
            <Link to={`/dashboard-${user.role}/edite-post/${post._id}`}>
              Edit
            </Link>
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-md cursor-pointer"
          >
            Delete
          </button>
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

        <h3 className="text-lg font-semibold mb-3 line-clamp-2">
          {post.title}
        </h3>

        <div className="flex justify-start space-x-3 text-gray-400 text-sm items-center">
          <Link to={`/post/${post._id}`} className="hover:text-white">
            💬 {post.comments?.length || 0} Comments
          </Link>

          <button
            onClick={handleLike}
            disabled={isLoading}
            className="flex items-center space-x-1 hover:text-red-400 transition"
          >
            <FaHeart
              className={`transition-transform ${
                liked ? "scale-125 text-red-500" : ""
              }`}
            />
            <span>{likes} Likes</span>
          </button>

          <span>👁️ {post.views || 0} Views</span>

          <button
            onClick={toggleModal}
            className="flex items-center space-x-1 hover:text-blue-400"
          >
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
              <button
                onClick={toggleModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
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
