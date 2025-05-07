import LatestPostSection from "../sections/LatestPostsSection";
import AuthorWidget from "../widgets/authorWidget";
import CategoryWidget from "../widgets/CategoryWidget";
import GalleryWidget from "../widgets/GalleryWidget";
import PopularPostsWidget from "../widgets/PopularPostsWidget";
import FeaturedCategorySection from "./FeaturedCategorySection";
import FeaturedPostsSection from "./FeaturedPostsSection";


const PostSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Post Sections */}
      <div className="lg:col-span-2 space-y-10">
        <LatestPostSection />
        < FeaturedCategorySection />
        < FeaturedPostsSection />
      </div>

      {/* Right Column - Widgets */}
      <aside className="space-y-6">
        <AuthorWidget />
        <CategoryWidget />
        < PopularPostsWidget />
        < GalleryWidget />
      </aside>
    </section>
  );
};

export default PostSection;
