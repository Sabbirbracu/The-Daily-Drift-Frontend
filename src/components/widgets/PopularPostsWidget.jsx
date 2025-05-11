import { useGetPublicPostsQuery } from "../../features/post/postApi";
import ListPostCard from "../card/ListPostCard";

const PopularPostWidget = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();

  if (isLoading)
    return (
      <div className="bg-[#1e1e28] p-4 rounded-md text-white text-center">
        Loading popular posts...
      </div>
    );

  if (isError)
    return (
      <div className="bg-[#1e1e28] p-4 rounded-md text-red-500 text-center">
        Failed to load popular posts
      </div>
    );

  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!popularPosts.length)
    return (
      <div className="bg-[#1e1e28] p-4 rounded-md text-gray-400 text-center">
        No popular posts found.
      </div>
    );

  return (
    <div className="bg-[#1e1e28] p-4 rounded-md text-white">
      <h2 className="text-xl font-bold mb-4">🔥 Popular Posts</h2>
      <div className="space-y-4">
        {popularPosts.map((post) => (
          <ListPostCard
            key={post._id}
            title={post.title}
            image={post.image || "/placeholder.jpg"}
            category={post.category}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularPostWidget;
