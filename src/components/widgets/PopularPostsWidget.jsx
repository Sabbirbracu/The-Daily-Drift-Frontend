import { useGetPostsQuery } from "../../features/post/postApi";
import ListPostCard from "../card/ListPostCard";

const PopularPostWidget = () => {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <p className="text-white text-center">Loading popular posts...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load popular posts</p>;


  const popularPosts = [...posts]
    .sort((a, b) => b.views - a.views) 
    .slice(0, 5);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-white">
        Popular Posts <span className="text-red-500">...</span>
      </h2>
      <div className="space-y-4">
        {popularPosts.map((post) => (
          <ListPostCard
            key={post._id}
            title={post.title}
            image={post.image}
            category={post.category}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default PopularPostWidget;
