import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaRegSmile, FaReply, FaTrash } from "react-icons/fa";
import useAuth from "../features/auth/hooks/useAuth";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useReactToCommentMutation,
} from "../features/comment/commentApi";

const reactions = [
  { emoji: "👍", label: "like" },
  { emoji: "😂", label: "haha" },
  { emoji: "😡", label: "angry" },
  { emoji: "😢", label: "sad" },
  { emoji: "❤️", label: "love" },
];

const CommentCard = ({ comment, postId, refetch, replies = [] }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [reactToComment] = useReactToCommentMutation();

  const { user } = useAuth();

  const uniqueReactionTypes = [
    ...new Set(comment.reactions?.map((r) => r.type)),
  ];
  const displayedReactions = reactions.filter((r) =>
    uniqueReactionTypes.includes(r.label)
  );

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    try {
      await createComment({
        postId,
        content: replyText,
        parentComment: comment._id,
      }).unwrap();
      setReplyText("");
      setShowReplyBox(false);
      refetch();
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id).unwrap();
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleReaction = async (reactionLabel) => {
    const reactionType = reactionLabel.toLowerCase();
    try {
      await reactToComment({
        commentId: comment._id,
        reactionType,
      });
      await refetch();
    } catch (err) {
      console.error("Reaction failed:", err?.data?.message || "Unknown error");
    } finally {
      setShowReactions(false);
    }
  };

  return (
    <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg relative my-3">
      {/* Avatar */}
      <img
        src={
          comment.author?.profileImage ||
          "https://ui-avatars.com/api/?name=Unknown&background=random"
        }
        alt={comment.author?.displayName}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Main Comment Content */}
      <div className="flex-1">
        <p className="font-semibold text-white">
          {comment.author?.displayName || "Anonymous"}
        </p>
        <p className="text-gray-300 mt-1">{comment.content}</p>

        {/* Reactions Display */}
        {displayedReactions.length > 0 && (
          <div className="mt-2 flex gap-1 text-xl">
            {displayedReactions.map((r) => (
              <span key={r.label} title={r.label}>
                {r.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mt-2 relative">
          <button
            className="hover:text-white flex items-center gap-1"
            onClick={() => setShowReplyBox((prev) => !prev)}
          >
            <FaReply /> Reply
          </button>

          {/* React */}
          <div className="relative">
            <button
              className="hover:text-white flex items-center gap-1"
              onClick={() => setShowReactions((prev) => !prev)}
            >
              <FaRegSmile /> React
            </button>

            {/* Fancy Reaction Popup */}
            <AnimatePresence>
              {showReactions && (
                <motion.div
                  className="absolute left-0 bottom-full mb-3 bg-gray-900 border border-gray-600 p-2 rounded-full shadow-xl flex gap-2 z-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {reactions.map((r) => (
                    <button
                      key={r.label}
                      title={r.label}
                      onClick={() => handleReaction(r.label)}
                      className="text-2xl hover:scale-125 transition-all px-1"
                    >
                      {r.emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Delete */}
          {user?._id === comment.author?._id && (
            <button
              className="hover:text-red-400 flex items-center gap-1"
              onClick={handleDelete}
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>

        {/* Reply Box */}
        {showReplyBox && (
          <div className="mt-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white resize-none"
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleReplySubmit}
                className="text-sm px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Submit Reply
              </button>
            </div>
          </div>
        )}

        {/* Toggle Replies */}
        {replies?.length > 0 && (
          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="text-xs mt-3 text-blue-400 hover:underline"
          >
            {showReplies
              ? `Hide Replies`
              : `View Replies (${replies.length})`}
          </button>
        )}

        {/* Replies */}
        {showReplies && replies?.length > 0 && (
          <div className="mt-4 pl-6 border-l border-gray-600 space-y-3">
            {replies.map((reply) => (
              <CommentCard
                key={reply._id}
                comment={reply}
                postId={postId}
                refetch={refetch}
                replies={reply.replies}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
