import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostPreviewModal from "../components/modals/PostPreviewModal";
import PostCard from "../components/postCard";
import { useGetPublicPostsQuery } from "../features/post/postApi";

const Carousel = () => {
  const { data: posts, isLoading, isError } = useGetPublicPostsQuery();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [cardsToShow, setCardsToShow] = useState(isMobile ? 1 : 3);
  const [index, setIndex] = useState(0);
  const [previewPost, setPreviewPost] = useState(null);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setCardsToShow(mobile ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const max = posts ? posts.length - cardsToShow : 0;
        return prev >= max ? 0 : prev + 1;
      });
    }, isMobile ? 6000 : 3500); // ⏱️ Slower on mobile
    return () => clearInterval(interval);
  }, [posts, isMobile, cardsToShow]);

  const handleNext = () => {
    const max = posts.length - cardsToShow;
    setIndex((prev) => (prev >= max ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const max = posts.length - cardsToShow;
    setIndex((prev) => (prev <= 0 ? max : prev - 1));
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error fetching posts</div>;
  if (!posts || posts.length === 0) return <div className="text-center">No posts available</div>;

  return (
    <>
      <div className="relative w-full overflow-hidden py-6">
        {/* Carousel container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(100 / cardsToShow) * index}%)`,
            width: `${(posts.length * 100) / cardsToShow}%`,
          }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-2 transition-transform duration-300 hover:scale-105"
              style={{
                width: `${100 / posts.length}%`,
                minWidth: isMobile ? "100%" : "auto",
              }}
            >
              <PostCard
                {...post}
                id={post._id}
                onPreview={() => handlePreview(post)}
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal */}
      {previewPost && (
        <PostPreviewModal
          {...previewPost}
          id={previewPost._id}
          onClose={() => setPreviewPost(null)}
        />
      )}
    </>
  );
};

export default Carousel;
