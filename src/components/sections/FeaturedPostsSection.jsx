import { LuKanban } from "react-icons/lu";
import { useGetPublicPostsQuery } from "../../features/post/postApi";
import ListPostCard from "../card/LatestPostCard";
import PostCard from "../postCard";

const FeaturedPostsSection = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load featured posts</p>;
  if (!posts.length) return <p className="text-gray-400">No featured posts available</p>;

  const featuredPosts = posts.slice(0, 4);
  const [mainPost, ...sidePosts] = featuredPosts;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <LuKanban className="text-red-500 text-5xl font-extrabold" /> Featured Posts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Post */}
        <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl min-h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 transition-all group-hover:brightness-110" />
          <PostCard
            title={mainPost.title}
            image={mainPost.image}
            content={mainPost.content}
            category={mainPost.category}
          />
        </div>

        {/* Right Column - Small ListPostCards */}
        <div className="space-y-6">
          {sidePosts.map((post) => (
            <ListPostCard
              key={post._id}
              title={post.title}
              image={post.image}
              category={post.category}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;