import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaRegSmile, FaReply } from "react-icons/fa";

const reactions = [
  { emoji: "👍", label: "Like" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😢", label: "Sad" },
  { emoji: "❤️", label: "Love" },
];

const CommentCard = ({ comment }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    // TODO: Connect to backend or callback
    console.log("Reply submitted:", replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  const handleReaction = (reaction) => {
    console.log(`Reacted with: ${reaction}`);
    setShowReactions(false);
    // TODO: Connect to backend here
  };

  return (
    <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg relative">
      {/* Avatar */}
      <img
        src={
          comment.author?.profileImage ||
          "https://ui-avatars.com/api/?name=Unknown&background=random"
        }
        alt={comment.author?.displayName}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <p className="font-semibold text-white">
          {comment.author?.displayName || "Anonymous"}
        </p>
        <p className="text-gray-300 mt-1">{comment.text}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mt-2 relative">
          {/* Reply */}
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

            <AnimatePresence>
              {showReactions && (
                <motion.div
                  className="absolute left-0 bottom-full mt-2 bg-gray-700 p-1 rounded-xl shadow-lg flex gap-1 z-10"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  {reactions.map((r) => (
                    <button
                      key={r.label}
                      title={r.label}
                      onClick={() => handleReaction(r.label)}
                      className="text-xl hover:scale-125 transition-all px-1 py-1"
                    >
                      {r.emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                className="text-sm px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Submit Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
