// import React, { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import PostCard from "../components/postCard";
// import { useGetPublicPostsQuery } from "../features/post/postApi";

// const Carousel = () => {
//   const { data: posts, isLoading, isError } = useGetPublicPostsQuery();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? posts.length - 1 : prevIndex - 1
//     );
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching posts</div>;
//   }
//   if (!posts || posts.length === 0) {
//     return <div>No posts available</div>;
//   }

//   return (
//       <div className="mt-6 flex space-x-4 overflow-x-auto px-4 py-4">
//         {posts.slice(currentIndex, currentIndex + 3).map((post) => (
//           <div className="w-96" key={post._id}> {/* Setting width of each card */}
//             <PostCard
//               title={post.title}
//               image={post.image}
//               content={post.content}
//               category={post.category}
//               id={post._id} // Pass the id to PostCard
//             />
//           </div>
//         ))}

//         {/* Carousel Arrows */}
//       <button
//         onClick={goToPrev}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl"
//       >
//         <FaChevronLeft />
//       </button>
//       <button
//         onClick={goToNext}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl"
//       >
//         <FaChevronRight />
//       </button>
//       </div>
    
//   );
// };

// export default Carousel;


import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostCard from "../components/postCard";
import { useGetPublicPostsQuery } from "../features/post/postApi";

const Carousel = () => {
  const { data: posts, isLoading, isError } = useGetPublicPostsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts</div>;
  if (!posts || posts.length === 0) return <div>No posts available</div>;

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

  return (
    <div className="relative w-full overflow-hidden py-4">
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
              title={post.title}
              image={post.image}
              content={post.content}
              category={post.category}
              id={post._id}
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
  );
};

export default Carousel;

