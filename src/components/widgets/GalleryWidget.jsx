import { Link } from "react-router-dom";
import { useGetPublicPostsQuery } from "../../features/post/postApi";

const GalleryWidget = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();

  if (isLoading)
    return <p className="text-white text-center">Loading gallery...</p>;

  if (isError)
    return <p className="text-red-500 text-center">Failed to load gallery</p>;

  // Create a shallow copy of posts and sort them by the most recent 'createdAt'
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Get the most recent 6 posts
  const galleryPosts = sortedPosts.slice(0, 6);

  if (!galleryPosts.length)
    return (
      <p className="text-gray-400 text-center">No gallery posts available.</p>
    );

  return (
    <div className="bg-[#1e1e28] p-4 rounded-md text-white">
      <h2 className="text-xl font-bold mb-4">📸 Gallery</h2>
      <div className="grid grid-cols-3 gap-2">
        {galleryPosts.map((post) => (
          <Link
            to={`/post/${post._id}`} 
            key={post._id}
            className="block overflow-hidden rounded-md group"
          >
            <img
              src={post.image || "/newsLetterBG.jpg"} 
              alt={post.title || "Gallery image"}
              className="w-full h-20 object-cover transform group-hover:scale-110 transition duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryWidget;
