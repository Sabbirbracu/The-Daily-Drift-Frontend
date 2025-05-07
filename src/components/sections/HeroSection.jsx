import HeroCarousel from '../Carousal';

const HeroSection = () => {
  return (
    <section className="relative h-lvh w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
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