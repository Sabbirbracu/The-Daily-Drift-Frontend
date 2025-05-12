import { useEffect, useMemo, useState } from "react";
import { LuKanban } from "react-icons/lu";
import { useGetPublicPostsQuery } from "../../features/post/postApi";
import PostCard from "../postCard";

const FeaturedCategorySection = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();
  const [activeCategory, setActiveCategory] = useState(null);

  
  const categories = useMemo(() => {
    const unique = [...new Set(posts.map((post) => post.category))];
    return unique;
  }, [posts]);

  
  useEffect(() => {
    if (!activeCategory && categories.length) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  // Filter posts based on the active category
  const filteredPosts = posts
    .filter((post) => post.category === activeCategory)
    .slice(0, 3);  
  if (isLoading) return <p className="text-white">Loading featured categories...</p>;
  if (isError) return <p className="text-red-500">Failed to load posts</p>;

  return (
    <section className="mb-10">
      {/* Section Heading */}
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <LuKanban className="text-red-500 text-5xl font-extrabold"/> Featured Categories
      </h2>
        <div className="space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-semibold capitalize ${
                activeCategory === cat
                  ? "text-red-500 underline"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              title={post.title}
              image={post.image}
              content={post.content}
              category={post.category}
            />

          ))
        ) : (
          <p className="text-gray-400 col-span-full">No posts found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategorySection;
