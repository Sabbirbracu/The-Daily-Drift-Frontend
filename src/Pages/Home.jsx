import { Link } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import NewsLetter from "../components/sections/NewsLetter";
import PostSection from "../components/sections/PostSections";

const Home = () => {
  return (
    <div>
      <HeroSection />

      {/* View All Posts Button */}
      <div className="text-center my-8">
        <Link
          to="/posts"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-300"
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
