import { useGetPostsQuery } from "../features/api/postsApi";

const HeroCarousel = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {posts.slice(0, 3).map((post) => (
        <div key={post.id} className="bg-black text-white p-4 border border-red-500 rounded-md">
          <h2 className="text-xl font-bold primary-font mb-2">{post.title}</h2>
          <p className="content-font">{post.body.slice(0, 100)}...</p>
          <span className="text-sm text-red-400 mt-2 block">Category: Sample</span>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
