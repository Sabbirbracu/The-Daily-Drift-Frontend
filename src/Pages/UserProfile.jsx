import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetProfileQuery } from "../features/Profile/ProfileApi";
import InfoCard from "../Libs/InfoCard";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: User,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery(user?.id);
  console.log("🚀 ~ UserProfile ~ User:", User);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {isLoading && <h1>Loading Profile Data.....</h1>}
      {isError && <h1>Something went wrong {error.message}</h1>}
      {User && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <button
              onClick={() => navigate(`/dashboard-${user.role}/edit-profile`)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Image and Name */}
          <div className="flex items-center gap-6 mb-10">
            <img
              src={User.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">{User.fullName}</p>
              <p className="text-sm text-gray-400">{User.email}</p>
            </div>
          </div>

          {/* Personal + Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              title="Personal Details"
              details={[
                ["Date of Birth", User.dob],
                ["Gender", User.gender],
                ["Nationality", User.nationality],
                ["Address", User.address],
                ["Phone", User.phone],
                ["Email", User.email],
              ]}
            />

            <InfoCard
              title="Account Details"
              details={[
                ["Display Name", User.userName],
                ["Account Created", User.accountCreated],
                ["Last Login", User.lastLogin],
                ["AccountType", User.accountType],
                ["Account Verified", User.accountVerified],
                ["Language", User.language],
                ["Time Zone", User.timezone],
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
