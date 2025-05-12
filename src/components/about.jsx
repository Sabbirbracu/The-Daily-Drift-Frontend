const teamMembers = [
  {
    name: "Sabbir Ahmed",
    role: "Team Lead",
    image: "/images/sabbir.jpeg", // Add the correct path or use a public image URL
    description:
      "Sabbir leads our vision and strategy with a passion for innovation and storytelling.",
  },
  {
    name: "Nazmul Hasan",
    role: "Lead Developer",
    image: "/images/nazmul.jpeg",
    description:
      "Nazmul architects the tech magic behind our platform with clean, scalable code.",
  },
  {
    name: "Nazmul Hossen Ashik",
    role: "Lead Developer",
    image: "/images/nazmul-ashik.jpeg",
    description:
      "Nazmul creates the user-friendly interface and ensures smooth navigation.",
  },
];

const About = () => {
  return (
    <section className="py-12 px-4 text-white bg-black-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-red-400">{member.role}</p>
              <p className="mt-2 text-sm text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
