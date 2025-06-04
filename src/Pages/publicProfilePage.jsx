import toast from "react-hot-toast";
import { FaShareAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
    useFollowUserMutation,
    useGetMyProfileQuery,
    useGetUserProfileDetailsQuery,
    useUnfollowUserMutation,
} from "../features/users/userApi";

const PublicProfilePage = () => {
  const { displayName } = useParams(); // e.g., /users/sabbir123

  const { data: publicProfile, isLoading, isError } =
    useGetUserProfileDetailsQuery(displayName);

  const { data: currentUser } = useGetMyProfileQuery(); // ✅ Corrected hook

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const isOwnProfile = currentUser?.displayName === displayName;
  const isFollowing = publicProfile?.followers?.includes(currentUser?._id);

  const handleShare = () => {
    const link = `${window.location.origin}/users/${displayName}`;
    navigator.clipboard.writeText(link);
    toast.success("Profile link copied to clipboard!");
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(publicProfile._id).unwrap();
        toast.success("Unfollowed");
      } else {
        await followUser(publicProfile._id).unwrap();
        toast.success("Followed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="text-white">Loading profile...</p>;
  if (isError || !publicProfile)
    return <p className="text-red-500">Failed to load profile.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={publicProfile.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-red-500"
        />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          {publicProfile.fullName}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-gray-300">
          @{publicProfile.displayName}
        </p>

        {publicProfile.bio && (
          <p className="text-md text-gray-700 dark:text-gray-300 italic">
            {publicProfile.bio}
          </p>
        )}

        <p className="text-sm text-zinc-400">
          {publicProfile.followers?.length || 0} followers
        </p>

        <div className="flex gap-4 mt-4">
          {!isOwnProfile && (
            <button
              onClick={handleFollowToggle}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isFollowing
                  ? "bg-gray-300 text-black"
                  : "bg-red-500 text-white"
              }`}
            >
              {isFollowing ? (
                <span className="flex items-center gap-1">
                  <FaUserCheck /> Unfollow
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <FaUserPlus /> Follow
                </span>
              )}
            </button>
          )}

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium flex items-center gap-1"
          >
            <FaShareAlt /> Share Profile
          </button>
        </div>
      </div>

      {publicProfile.aboutMe && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">
            About Me
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {publicProfile.aboutMe}
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicProfilePage;
