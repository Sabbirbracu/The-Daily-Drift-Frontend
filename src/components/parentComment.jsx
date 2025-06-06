import { useState } from "react";
import toast from "react-hot-toast";
import CommentsSection from "../components/commentsSection";

const ParentComment = ({ commentData, parentCommentId = null, postId }) => {
  // Added optional parentCommentId prop (null by default)
  const [comment, setComment] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    setIsCreating(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          content: comment,
          parentComment: parentCommentId,  // Send parentComment ID here (or null)
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit comment");
      }

      await res.json();
      toast.success("Comment submitted!");
      setComment("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CommentsSection
      postId={postId}
      commentData={commentData}
      comment={comment}
      setComment={setComment}
      handleCommentSubmit={handleCommentSubmit}
      isCreating={isCreating}
    />
  );
};

export default ParentComment;
