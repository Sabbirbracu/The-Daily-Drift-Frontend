import { LuKanban } from "react-icons/lu";
import { useGetPublicPostsQuery } from "../../features/post/postApi";
import LatestPostCard from "../card/LatestPostCard";

const LatestPostSection = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();

  if (isLoading) {
    return <p className="text-white text-center">Loading posts...</p>;
  }

  if (isError || !Array.isArray(posts)) {
    return <p className="text-red-500 text-center">Failed to load posts</p>;
  }

  // Sort posts by createdAt (newest first)
  const sortedPosts = posts
    .slice() // Create a shallow copy of the posts array to avoid mutating the original data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <LuKanban className="text-red-500 text-5xl font-extrabold" />
        Latest Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Render the first 4 most recent posts */}
        {sortedPosts.slice(0, 4).map((post) => (
          <LatestPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPostSection;
