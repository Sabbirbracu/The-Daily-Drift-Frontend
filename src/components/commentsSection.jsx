import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CommentCard from "../components/commentCard";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../features/comment/commentApi";

const CommentsSection = ({ postId }) => {
  const [showComment, setShowComment] = useState(true);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const { data: commentData, refetch } = useGetCommentsQuery(postId);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await createComment({ postId, content: comment });
      setComment("");
      refetch();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    if (showComment && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [showComment]);

  const { comments = [], replies = [] } = commentData || {};

  // Organize replies under each parent comment
  const nestedComments = comments.map((comment) => ({
    ...comment,
    replies: replies.filter((r) => r.parentComment === comment._id),
  }));

  return (
    <div className="mt-8">
      {/* Toggle */}
      <button
        onClick={() => setShowComment((prev) => !prev)}
        className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white transition"
      >
        {showComment ? "Hide Comments" : "Show Comments"}
        {showComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </button>

      {/* Comments */}
      {showComment && (
        <div className="mt-6 space-y-4">
          {nestedComments.length ? (
            nestedComments.map((c) => (
              <CommentCard
                key={c._id}
                comment={c}
                replies={c.replies}
                postId={postId}
                refetch={refetch}
              />
            ))
          ) : (
            <p className="text-gray-400">No comments yet. Be the first!</p>
          )}
        </div>
      )}

      {/* Comment Input */}
      <div className="mt-8">
        <textarea
          ref={commentInputRef}
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:outline-none text-white resize-none"
          rows={4}
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-3 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md text-white transition disabled:opacity-50"
          disabled={isCreating || !comment?.trim()}
        >
          {isCreating ? "Submitting..." : "Submit Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
