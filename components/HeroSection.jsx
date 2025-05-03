import HeroCarousel from './Carousel';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-6">
        <h1 className="text-4xl md:text-6xl primary-font font-bold text-center mb-8">
          Discover the Latest from Every Corner
        </h1>
        <HeroCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
