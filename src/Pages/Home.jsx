import React from "react";
import HeroSection from "../components/sections/HeroSection";
import NewsLetter from "../components/sections/NewsLetter";
import PostSection from "../components/sections/PostSections";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PostSection />
      <NewsLetter />

      
    </div>
  );
};

export default Home;
