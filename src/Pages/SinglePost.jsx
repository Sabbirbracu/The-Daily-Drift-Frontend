import DOMPurify from "dompurify";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";
import CommentCard from "../components/card/CommentCard";
import NewsLetter from "../components/sections/NewsLetter";
import CategoryWidget from "../components/widgets/CategoryWidget";
import PopularPostWidget from "../components/widgets/PopularPostsWidget";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../features/comment/commentApi";
import { useGetPostByIdQuery } from "../features/post/postApi";

const SinglePost = () => {
  const [showComment, setShowComment] = useState(true);
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);
  const { data: commentData, refetch } = useGetCommentsQuery(id);
  const [comment, setComment] = useState("");
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      await createComment({ postId: id, content: comment }).unwrap();
      toast.success("Comment added");
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add comment");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const shareUrl = window.location.href;

  return (
    <div className="bg-gray-950 min-h-screen text-white py-10 px-4">
      {isLoading && <h1 className="text-center text-xl">Loading...</h1>}
      {isError && (
        <h1 className="text-center text-red-500 text-xl">
          Something went wrong! {error.message}
        </h1>
      )}

      {!isLoading && post && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="md:col-span-8">
            <h1 className="text-4xl font-bold mb-4 text-center capitalize">
              {post.title}
            </h1>

            {/* Post Image */}
            <img
              src={post.image || "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={post.title}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-4"
            />

            {/* Author Info */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-400 px-1">
              <p>
                By <span className="font-medium text-white">{post.author?.name || "Unknown Author"}</span>
              </p>
              <p>{formatDate(post.createdAt)}</p>
            </div>

            {/* Post Content */}
            <div
              className="prose prose-invert max-w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />

            {/* Tags / Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Buttons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-400 hover:bg-blue-500 p-2 rounded-full"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`https://www.instagram.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-pink-500 hover:bg-pink-600 p-2 rounded-full"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={`https://wa.me/?text=${post.title}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>

            {/* Comment Toggle */}
            <div className="mt-8">
              <button
                onClick={() => setShowComment((prev) => !prev)}
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
              >
                {showComment ? "Hide Comments" : "Show Comments"}
                {showComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
            </div>

            {/* Comments Section */}
            {showComment && (
              <div className="mt-6 space-y-4">
                {commentData?.comments?.length > 0 ? (
                  commentData.comments.map((c) => (
                    <CommentCard key={c._id} comment={c} />
                  ))
                ) : (
                  <p className="text-gray-400">No comments yet.</p>
                )}
              </div>
            )}

            {/* Comment Input */}
            <div className="mt-8">
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:outline-none text-white resize-none"
                rows={4}
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                onClick={handleCommentSubmit}
                className="mt-3 red-button px-5 rounded-md text-white transition"
                style={{ fontSize: "18px" }}
                disabled={isCreating}
              >
                {isCreating ? "Submitting..." : "Submit Comment"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <PopularPostWidget />
            <CategoryWidget />
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsLetter />
      </div>
    </div>
  );
};

export default SinglePost;
