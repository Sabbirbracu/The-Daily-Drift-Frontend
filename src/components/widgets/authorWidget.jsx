import React from "react";

const AuthorWidget = ({
  name = "Nazmul Hasan",
  bio = "A passionate full-stack developer with a love for building interactive and scalable web applications. I specialize in React, Node.js, and MongoDB. I'm always looking for new challenges and opportunities to learn and grow as a developer. Let's connect and collaborate on exciting projects. ",
  image = "/images/nazmul.jpeg", // Make sure this image is in your public folder
  learnMoreUrl = "/login", // Change to external link if needed
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white text-center shadow">
      <img
        src={image}
        alt={`${name} - Web Developer`}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold">Hi 👋 I Am {name}</h3>
      <p className="text-sm text-gray-400 mt-2">{bio}</p>
      <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full">
          Learn More
        </button>
      </a>
    </div>
  );
};

export default AuthorWidget;
