import { LuKanban } from "react-icons/lu";
import { useGetPostsQuery } from "../../features/post/postApi";
import LatestPostCard from "../card/latestPostCard";

const LatestPostSection = () => {
  const { data, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return <p className="text-white text-center">Loading posts...</p>;
  }

  if (isError || !Array.isArray(data)) {
    return <p className="text-red-500 text-center">Failed to load posts</p>;
  }

  const posts = data.filter((post) => post && post._id); // Ensure valid posts

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <LuKanban className="text-red-500 text-5xl font-extrabold" />
        Latest Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.slice(0, 4).map((post) => (
          <LatestPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPostSection;
