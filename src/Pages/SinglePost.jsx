import DOMPurify from "dompurify";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";
import CommentCard from "../components/card/CommentCard";
import NewsLetter from "../components/sections/NewsLetter";
import PopularPostWidget from "../components/widgets/PopularPostsWidget";
import {
  useCreateCommentMutation,
  useGetCommtentsQuery,
} from "../features/comment/commentApi";
import { useGetPostByIdQuery } from "../features/post/postApi";

const SinglePost = () => {
  const [showComment, setShowComment] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetPostByIdQuery(id);
  const [comment, setComment] = useState("");
  const { data: comments } = useGetCommtentsQuery(id);
  const [createComment] = useCreateCommentMutation();

  return (
    <div className="bg-gray-950">
      <div className="min-h-screen flex">
        {isLoading && <h1>Loading.....</h1>}
        {!isLoading && isError && (
          <h1>Something went wrong! {error.message}</h1>
        )}
        <div className="flex-2/12 "></div>
        <div className="flex-8/12  px-5">
          {data && (
            <div>
              <h1 className="py-5 text-3xl font-bold capitalize text-center ">
                {data?.title}
              </h1>
              <div
                className="prose text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.content),
                }}
              />
            </div>
          )}
          <button
            onClick={() => setShowComment((prev) => !prev)}
            className="mt-5 flex items-center gap-0.5 bg-gray-600 px-3 py-1 rounded-md"
          >
            <span>See Comments</span>
            <span>
              {showComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </button>
          {showComment &&
            comments &&
            comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}

          <div className="mt-5 ">
            <textarea
              className="focus:outline-none border-2 px-2 py-1 w-full rounded-md"
              name="comment"
              placeholder="Leave a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={() => {
                createComment(id, ...comment);
              }}
              className="bg-gray-400 hover:bg-red-400 px-3 py-1 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex-2/12 ">
          <PopularPostWidget />
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default SinglePost;
