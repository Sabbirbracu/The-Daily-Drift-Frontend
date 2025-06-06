import DOMPurify from "dompurify";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ParentComment from "../components/parentComment"; // Adjust path if needed
import NewsLetter from "../components/sections/NewsLetter";
import CategoryWidget from "../components/widgets/CategoryWidget";
import PopularPostWidget from "../components/widgets/PopularPostsWidget";
import { useGetCommentsQuery } from "../features/comment/commentApi";
import { useGetPostByIdQuery } from "../features/post/postApi";

const SinglePost = () => {
  const { id } = useParams();
  const [showComment, setShowComment] = useState(true);

  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);
  const { data: commentData, refetch } = useGetCommentsQuery(id);
  console.log("Post Data:", post);

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
            <h1 className="text-5xl font-extrabold mb-6 text-center capitalize leading-tight">
              {post.title}
            </h1>

            {/* Post Image */}
            <img
              src={post.image || "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop"}
              alt={post.title}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-4"
            />

            {/* Author Info */}
            <div className="flex items-center justify-between mb-6 text-md text-gray-400 px-1">
              <Link to={`/author/${post.author?.displayName}`} className="flex items-center gap-2 hover:underline">
                <img
                  src={post.author?.profileImage || "https://ui-avatars.com/api/?name=Unknown&background=random"}
                  alt={post.author?.displayName || "Author"}
                  className="w-12 h-12 rounded-full object-cover border border-gray-700"
                />
                <span className="font-medium text-white">
                  {post.author?.displayName || "Unknown Author"}
                </span>
              </Link>
              <p>{formatDate(post.createdAt)}</p>
            </div>

            {/* Post Content */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />


            {/* Tags / Categories */}
            {post.categories?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span key={cat} className="bg-gray-700 text-sm px-3 py-1 rounded-full">
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

            {/* Comment Section */}
            <ParentComment commentData={commentData} postId={id} />
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <PopularPostWidget />
            <CategoryWidget />
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16">
        <NewsLetter />
      </div>
    </div>
  );
};

export default SinglePost;
