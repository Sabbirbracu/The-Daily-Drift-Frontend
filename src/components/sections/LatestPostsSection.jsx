import { useGetPostsQuery } from "../../features/post/postApi";
import AuthorWidget from "../widgets/authorWidget";
import CategoryWidget from "../widgets/CategoryWidget";
import LatestPostCard from "/Users/sabbirahmad/The Daily Drift/frontend/src/components/card/latestPostCard";

const LatestPostsSection = () => {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <p className="text-white text-center">Loading posts...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load posts</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left column: Latest posts */}
      <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
        {posts.slice(0,4).map((post) => (
          <LatestPostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Right column: Sidebar */}
      <div className="space-y-6">
        <AuthorWidget />
        <CategoryWidget /> {/* <- replaced LatestPostWidget */}
      </div>
    </div>
  );
};

export default LatestPostsSection;
