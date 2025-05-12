import LatestPostCard from "../components/card/LatestPostCard";
import useSearchData from "../features/auth/hooks/SearchData";

const AllPosts = () => {
  const { posts, isLoading, isError, error } = useSearchData();

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error?.data?.message || "Failed to load posts."}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Blog Posts</h2>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600">No posts found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <LatestPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
