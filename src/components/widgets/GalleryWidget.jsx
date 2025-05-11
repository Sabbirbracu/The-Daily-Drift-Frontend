import { useGetPublicPostsQuery } from "../../features/post/postApi";

const GalleryWidget = () => {
  const { data: posts = [], isLoading, isError } = useGetPublicPostsQuery();

  if (isLoading) return <p className="text-white text-center">Loading gallery...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load gallery</p>;

  const galleryPosts = posts.slice(0, 6); 

  return (
    <div className="bg-[#1e1e28] p-4 rounded-md text-white">
      <h2 className="text-xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-3 gap-2">
        {galleryPosts.map((post) => (
          <div key={post._id} className="overflow-hidden rounded-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-20 object-cover transform hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryWidget;
