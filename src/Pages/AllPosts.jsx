import LatestPostCard from "../components/card/LatestPostCard";
import useSearchData from "../features/auth/hooks/SearchData";

const AllPosts = () => {
  const { posts, isLoading, isError, error } = useSearchData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500 text-lg animate-pulse">Loading posts...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500 text-lg font-semibold">
          {error?.data?.message || "Failed to load posts."}
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">
        All Blog Posts
      </h2>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No posts found.
        </div>
      ) : (
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label="All blog posts"
        >
          {posts.map((post) => (
            <LatestPostCard
              key={post._id}
              post={post}
              className="transform transition duration-300 hover:scale-[1.03] shadow-lg rounded-lg"
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default AllPosts;
