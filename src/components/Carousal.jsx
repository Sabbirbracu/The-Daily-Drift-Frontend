import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostCard from "../components/postCard";
import { useGetPostsQuery } from "../features/post/postApi";

const Carousel = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching posts</div>;
  }
  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
      <div className="mt-6 flex space-x-4 overflow-x-auto px-4 py-4">
        {posts.slice(currentIndex, currentIndex + 3).map((post) => (
          <div className="w-96" key={post._id}> {/* Setting width of each card */}
            <PostCard
              title={post.title}
              image={post.image}
              content={post.content}
              category={post.category}
              id={post._id} // Pass the id to PostCard
            />
          </div>
        ))}

        {/* Carousel Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl"
      >
        <FaChevronRight />
      </button>
      </div>
    
  );
};

export default Carousel;
