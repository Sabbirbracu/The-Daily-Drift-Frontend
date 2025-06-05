import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllAuthorsQuery } from "../../features/users/userApi"; // ✅ Updated import

const AuthorWidget = () => {
  const { data: users = [], isLoading, isError } = useGetAllAuthorsQuery(); // ✅ Updated hook
  const [currentIndex, setCurrentIndex] = useState(0);

  // ⏱ Rotate author every 5 seconds
  useEffect(() => {
    if (!users || users.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % users.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [users]);

  // 🌀 Loading UI
  if (isLoading) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-white text-center shadow">
        <p>Loading authors...</p>
      </div>
    );
  }

  // ❌ Error or no authors
  if (isError || users.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-white text-center shadow">
        <p>No authors found.</p>
      </div>
    );
  }

  // ✅ Display current author
  const currentAuthor = users[currentIndex];
  const {
    fullName,
    displayName,
    profileImage,
    profileDetails = {},
  } = currentAuthor;

  const { bio = "No bio available." } = profileDetails;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center content-font"> Featured Authors</h2>
      <div className="bg-gray-900 p-6 rounded-xl text-white text-center shadow transition-all duration-500 ease-in-out">
        <img
          src={profileImage || "/default-avatar.png"}
          alt={fullName}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-white"
        />
        <h3 className="text-xl font-semibold">Hi 👋 I am {fullName}</h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-4">{bio}</p>

        {displayName && (
          <Link to={`/author/${displayName}`}>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full">
              Learn More
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthorWidget;
