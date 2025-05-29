import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetProfileQuery } from "../features/Profile/ProfileApi";
import InfoCard from "../Libs/InfoCard";

// Helper to format dates as "19 Sep 2002"
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery(user?.id);

  const fallbackAvatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-medium">Loading Profile Data...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">
        <h1 className="text-xl font-medium">Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <button
            onClick={() => navigate(`/dashboard-${user.role}/edit-profile`)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Overview */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={profile.profileImage || fallbackAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">{profile.fullName}</p>
              {profile.role === "admin" && (
                <span className="flex items-center gap-1 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                  <FaUserShield className="text-white" />
                  Admin
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">{profile.email}</p>
            
          </div>
        </div>


        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Personal Details"
            details={[
              ["Date of Birth", formatDate(profile.dob)],
              ["Gender", profile.gender || "N/A"],
              ["Nationality", profile.nationality || "N/A"],
              ["Address", profile.address || "N/A"],
              ["Phone", profile.phone || "N/A"],
              ["Email", profile.email],
            ]}
          />

          <InfoCard
            title="Account Details"
            details={[
              ["Display Name", profile.displayName || "N/A"],
              ["Account Created", formatDate(profile.accountCreated)],
              ["Account Type", profile.accountType || "Standard"],
              ["Verified", profile.accountVerified || "Unverified"],
              ["Language", profile.language || "English"],
              ["Time Zone", profile.timezone || "N/A"],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
