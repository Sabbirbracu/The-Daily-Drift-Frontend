import { useGetPostsQuery } from "../../features/post/postApi";
import LatestPostCard from "../card/latestPostCard";

const LatestPostSection = () => {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <p className="text-white text-center">Loading posts...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load posts</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.slice(0, 4).map((post) => (
          <LatestPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPostSection;
