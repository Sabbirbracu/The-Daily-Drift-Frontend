import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostPreviewModal from "../components/modals/PostPreviewModal"; // adjust path if needed
import PostCard from "../components/postCard"; // adjust path if needed
import { useGetPublicPostsQuery } from "../features/post/postApi";

const Carousel = () => {
  const { data: posts, isLoading, isError } = useGetPublicPostsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [previewPost, setPreviewPost] = useState(null); // 🆕

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1);
      } else if (width < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error fetching posts</div>;
  if (!posts || posts.length === 0) return <div className="text-center">No posts available</div>;

  const maxIndex = posts.length - cardsToShow;

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  return (
    <>
      <div className="relative w-full overflow-hidden py-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / cardsToShow) * currentIndex}%)`,
            width: `${(posts.length * 100) / cardsToShow}%`,
          }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-2"
              style={{ width: `${100 / posts.length}%` }}
            >
              <PostCard
                {...post}
                id={post._id}
                onPreview={() => handlePreview(post)} // trigger modal
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal rendered outside of overflow container */}
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
