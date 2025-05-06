import LatestPostSection from "../sections/LatestPostsSection";
import AuthorWidget from "../widgets/authorWidget";
import CategoryWidget from "../widgets/CategoryWidget";
import FeaturedCategorySection from "./FeaturedCategorySection";

const PostSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Post Sections */}
      <div className="lg:col-span-2 space-y-10">
        <LatestPostSection />
        < FeaturedCategorySection />
      </div>

      {/* Right Column - Widgets */}
      <aside className="space-y-6">
        <AuthorWidget />
        <CategoryWidget />
      </aside>
    </section>
  );
};

export default PostSection;
