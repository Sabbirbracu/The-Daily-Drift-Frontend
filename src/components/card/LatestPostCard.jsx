// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { FiShare2 } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../features/auth/hooks/useAuth";
// import { useDeletePostMutation, useToggleLikePostMutation } from "../../features/post/postApi";

// const LatestPostCard = ({ post, showMenu = false }) => {
//   const [likes, setLikes] = useState(post.likes?.length || 0);
//   const [liked, setLiked] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [toggleLike, { isLoading }] = useToggleLikePostMutation();
//   const [deletePost] = useDeletePostMutation();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.id && post.likes?.includes(user.id)) {
//       setLiked(true);
//     }
//   }, [post.likes, user?.id]);

//   const handleLike = async () => {
//     if (!user?.id) return navigate("/login");
//     try {
//       await toggleLike(post._id).unwrap();
//       setLiked((prev) => !prev);
//       setLikes((prev) => (liked ? prev - 1 : prev + 1));
//     } catch (err) {
//       console.error("Error toggling like:", err);
//     }
//   };

//   const toggleModal = () => {
//     if (!user?.id) return navigate("/login");
//     setShowModal((prev) => !prev);
//   };

//   const handleDelete = async () => {
//     try {
//       const result = await deletePost(post._id).unwrap();
//       console.log("Post deleted:", result);
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   if (!post) return null;

//   return (
//     <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative group">
//       {showMenu && user?.role && (
//         <div className="hidden group-hover:flex absolute top-2.5 left-2.5 space-x-2.5 transition-all duration-700 z-10">
//           <Link
//             to={`/dashboard-${user.role}/edite-post/${post._id}`}
//             className="bg-yellow-400 px-4 py-2 rounded-md"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 px-4 py-2 rounded-md"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       <Link to={`/post/${post._id}`}>
//         <img
//         src={post.image || "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
//         alt={post.title}
//         className="w-full h-48 object-cover"/>

//       </Link>

//       <div className="p-4 text-white">
//         <div className="text-sm text-gray-400 flex justify-between mb-2">
//           <span className="uppercase">{post.category || "General"}</span>
//           <span>{new Date(post.createdAt).toDateString()}</span>
//         </div>

//         <Link to={`/post/${post._id}`}>
//           <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:underline">
//              {post.title}
//           </h3>
//         </Link>


//         <div className="flex items-center space-x-3 text-gray-400 text-sm">
//           <Link to={`/post/${post._id}`} className="hover:text-white">
//             💬 {post.comments?.length || 0} Comments
//           </Link>

//           <button
//             onClick={handleLike}
//             disabled={isLoading}
//             className="flex items-center space-x-1 hover:text-red-400 transition"
//           >
//             <FaHeart
//               className={`transition-transform ${
//                 liked ? "scale-125 text-red-500" : ""
//               }`}
//             />
//             <span>{likes} Likes</span>
//           </button>

//           <span>👁️ {post.views || 0} Views</span>

//           <button
//             onClick={toggleModal}
//             className="flex items-center space-x-1 hover:text-blue-400"
//           >
//             <FiShare2 />
//             <span>Share</span>
//           </button>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-md text-black w-[90%] max-w-md">
//             <h4 className="text-lg font-semibold mb-2">Share this post</h4>
//             <input
//               type="text"
//               value={`${window.location.origin}/post/${post._id}`}
//               readOnly
//               className="w-full p-2 border border-gray-300 rounded-md"
//               onClick={(e) => e.target.select()}
//             />
//             <div className="flex justify-end mt-3">
//               <button
//                 onClick={toggleModal}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// LatestPostCard.propTypes = {
//   post: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     image: PropTypes.string,
//     category: PropTypes.string,
//     createdAt: PropTypes.string,
//     comments: PropTypes.array,
//     likes: PropTypes.array,
//     views: PropTypes.number,
//   }).isRequired,
//   showMenu: PropTypes.bool,
// };

// export default LatestPostCard;



// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { FiShare2 } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../features/auth/hooks/useAuth";
// import { useGetLikeQuery } from "../../features/post/likeApi"; // ✅ import like count query
// import { useDeletePostMutation, useToggleLikePostMutation } from "../../features/post/postApi";

// const LatestPostCard = ({ post, showMenu = false }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [liked, setLiked] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const [toggleLike, { isLoading }] = useToggleLikePostMutation();
//   const [deletePost] = useDeletePostMutation();

//   const { data: likeData, refetch } = useGetLikeQuery(post._id); // ✅ fetch latest like count
//   const [likes, setLikes] = useState(post.likes?.length || 0);

//   // Update likes from backend whenever they change
//   useEffect(() => {
//     if (likeData?.likesCount !== undefined) {
//       setLikes(likeData.likesCount);
//     }
//   }, [likeData]);

//   useEffect(() => {
//     if (user?.id && post.likes?.includes(user.id)) {
//       setLiked(true);
//     }
//   }, [post.likes, user?.id]);

//   const handleLike = async () => {
//     if (!user?.id) return navigate("/login");
//     try {
//       await toggleLike(post._id).unwrap();
//       setLiked((prev) => !prev);
//       // Optimistically update UI
//       setLikes((prev) => (liked ? prev - 1 : prev + 1));
//       refetch(); // ✅ sync with backend
//     } catch (err) {
//       console.error("Error toggling like:", err);
//     }
//   };

//   const toggleModal = () => {
//     if (!user?.id) return navigate("/login");
//     setShowModal((prev) => !prev);
//   };

//   const handleDelete = async () => {
//     try {
//       const result = await deletePost(post._id).unwrap();
//       console.log("Post deleted:", result);
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   if (!post) return null;

//   return (
//     <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative group">
//       {showMenu && user?.role && (
//         <div className="hidden group-hover:flex absolute top-2.5 left-2.5 space-x-2.5 transition-all duration-700 z-10">
//           <Link
//             to={`/dashboard-${user.role}/edite-post/${post._id}`}
//             className="bg-yellow-400 px-4 py-2 rounded-md"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 px-4 py-2 rounded-md"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       <Link to={`/post/${post._id}`}>
//         <img
//           src={
//             post.image ||
//             "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           }
//           alt={post.title}
//           className="w-full h-48 object-cover"
//         />
//       </Link>

//       <div className="p-4 text-white">
//         <div className="text-sm text-gray-400 flex justify-between mb-2">
//           <span className="uppercase">{post.category || "General"}</span>
//           <span>{new Date(post.createdAt).toDateString()}</span>
//         </div>

//         <Link to={`/post/${post._id}`}>
//           <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:underline">
//             {post.title}
//           </h3>
//         </Link>

//         <div className="flex items-center space-x-3 text-gray-400 text-sm">
//           <Link to={`/post/${post._id}`} className="hover:text-white">
//             💬 {post.comments?.length || 0} Comments
//           </Link>

//           <button
//             onClick={handleLike}
//             disabled={isLoading}
//             className="flex items-center space-x-1 hover:text-red-400 transition"
//           >
//             <FaHeart
//               className={`transition-transform ${
//                 liked ? "scale-125 text-red-500" : ""
//               }`}
//             />
//             <span>{likes} Likes</span>
//           </button>

//           <span>👁️ {post.views || 0} Views</span>

//           <button
//             onClick={toggleModal}
//             className="flex items-center space-x-1 hover:text-blue-400"
//           >
//             <FiShare2 />
//             <span>Share</span>
//           </button>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-md text-black w-[90%] max-w-md">
//             <h4 className="text-lg font-semibold mb-2">Share this post</h4>
//             <input
//               type="text"
//               value={`${window.location.origin}/post/${post._id}`}
//               readOnly
//               className="w-full p-2 border border-gray-300 rounded-md"
//               onClick={(e) => e.target.select()}
//             />
//             <div className="flex justify-end mt-3">
//               <button
//                 onClick={toggleModal}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// LatestPostCard.propTypes = {
//   post: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     image: PropTypes.string,
//     category: PropTypes.string,
//     createdAt: PropTypes.string,
//     comments: PropTypes.array,
//     likes: PropTypes.array,
//     views: PropTypes.number,
//   }).isRequired,
//   showMenu: PropTypes.bool,
// };

// export default LatestPostCard;


import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth";
import { useGetLikeQuery } from "../../features/post/likeApi";
import {
  useDeletePostMutation,
  useToggleLikePostMutation,
} from "../../features/post/postApi";

const LatestPostCard = ({ post, showMenu = false }) => {
  if (!post) return null; // ✅ moved this check to top

  const { user } = useAuth();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [toggleLike, { isLoading }] = useToggleLikePostMutation();
  const [deletePost] = useDeletePostMutation();

  const { data: likeData, refetch } = useGetLikeQuery(post._id); // safe now
  const [likes, setLikes] = useState(post.likes?.length || 0);

  useEffect(() => {
    if (likeData?.likesCount !== undefined) {
      setLikes(likeData.likesCount);
    }
  }, [likeData]);

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post.likes, user?.id]);

  const handleLike = async () => {
    if (!user?.id) return navigate("/login");
    try {
      await toggleLike(post._id).unwrap();
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      refetch();
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const toggleModal = () => {
    if (!user?.id) return navigate("/login");
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
        <div className="hidden group-hover:flex absolute top-2.5 left-2.5 space-x-2.5 transition-all duration-700 z-10">
          <Link
            to={`/dashboard-${user.role}/edite-post/${post._id}`}
            className="bg-yellow-400 px-4 py-2 rounded-md"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      )}

      <Link to={`/post/${post._id}`}>
        <img
          src={
            post.image ||
            "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4 text-white">
        <div className="text-sm text-gray-400 flex justify-between mb-2">
          <span className="uppercase">{post.category || "General"}</span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        <Link to={`/post/${post._id}`}>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:underline">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center space-x-3 text-gray-400 text-sm">
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
              onClick={(e) => e.target.select()}
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

LatestPostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.array,
    views: PropTypes.number,
  }).isRequired,
  showMenu: PropTypes.bool,
};

export default LatestPostCard;
