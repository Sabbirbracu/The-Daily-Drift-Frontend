import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import NewsLetter from "../components/sections/NewsLetter";
import PostSection from "../components/sections/PostSections";

const Home = () => {
  return (
    <div>
      <HeroSection />
      {/* All Posts Link */}
      <div className="text-center my-6">
        <Link
          to="/posts"
          className="text-blue-600 font-semibold hover:underline"
        >
          View All Blog Posts →
        </Link>
      </div>
      <PostSection />

      <NewsLetter />
    </div>
  );
};

export default Home;
