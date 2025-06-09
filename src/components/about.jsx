
const About = () => {
  const versionFeatures = [
    "📊 Create polls directly in posts for engagement",
    "❤️ Like and view counts on each post",
    "👥 Follow/unfollow system for users",
    "💬 Add comments and threaded replies on posts",
    "😄 React to comments with emoji reactions",
    "🛡️ Admin moderation dashboard with approval workflow",
    "⏳ Post status tracking: pending / approved / declined",
    "📈 User dashboard with post & follower analytics",
    "🖼️ Post preview modal before publishing",
    "🧑‍💻 Public user profile with their posts and stats",
    "🎨 Revamped UI for the Create Post experience",
    "📬 Password recovery via email (forget password)",
    "🔗 Improved share post design and interaction",
    "📂 Categories management from admin panel",
    "📱 Fully mobile responsive layout",
  ];

  const upcoming = [
    "🎤 Voice-based post creation",
    "📱 Offline mode support",
    "🔔 Push notifications for interactions",
    "📊 Advanced post & user analytics",
    "🏅 Verified user system & badges",
    "📚 AI-powered blog writing assistant",
    "💬 AI-generated summaries & comments",
    "🧩 Polls and quizzes for blog engagement",
    "⚙️ Admin dashboard for deeper controls",
  ];

  const credits = [
    {
      name: "Ashik",
      role: "Frontend Developer",
      image: "/images/nazmul-ashik.jpeg",
    },
    {
      name: "Nazmul",
      role: "Backend Developer",
      image: "/images/nazmul.jpeg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          About <span className="text-red-500">The Daily Drift</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          A platform built to amplify voices, reward creativity, and bring writers and readers closer through technology.
        </p>
      </div>

      {/* Creator Section */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-yellow-400 primary-font">👨‍💻 Creator & Founder</h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">Sabbir Ahmad</h3>
          <p className="text-yellow-300 text-base italic mb-4">Full Stack Software Engineer & Visionary</p>
          <div className="text-white text-base sm:text-lg leading-relaxed space-y-4">
            <p>I’m passionate about tech, storytelling, and creating platforms that empower others.</p>
            <p>
              I’m a final-year CSE student at BRAC University, and founder of <span className="font-medium">Qullia</span>, a growing software agency.
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">The Daily Drift</span> is more than just a blog—it’s a movement.
            </p>
            <p>
              I started this alone, learning and building in public. Each line of code carries my late-night hopes.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
          <img
            src="/images/sabbir.jpeg"
            alt="Sabbir Ahmad"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/vision.jpg"
            alt="Vision"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-red-400 flex items-center gap-2">
            🌟 My Vision
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4">
            In a world overwhelmed with noise and distractions, <span className="font-semibold text-white">The Daily Drift</span> aspires to be a sanctuary for thoughtful expression. A space where ideas thrive and voices—big or small—matter.
            <br /><br />
            Whether you’re reflecting, sharing, or sparking dialogue, <span className="text-yellow-400 font-semibold">this is your canvas</span>.
          </p>
        </div>
      </div>

      {/* What's New Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-400 mb-10">
          🚀 What’s New in v2.0
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {versionFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 sm:p-6 rounded-2xl border border-green-400 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <p className="text-base sm:text-lg font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 mb-10">
          🔮 What’s Coming Next
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 sm:p-6 rounded-2xl border border-yellow-400 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <p className="text-base sm:text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Credits Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Special thanks for staying with me at Version 1.0</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {credits.map((person, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-xl shadow-inner w-full sm:w-64 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white shadow">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-semibold text-white">{person.name}</h4>
              <p className="text-gray-400 text-sm">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
