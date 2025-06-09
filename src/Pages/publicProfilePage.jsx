import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import LatestPostCard from "../components/card/LatestPostCard";
import ListPostCard from "../components/card/ListPostCard";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByIdQuery } from "../features/post/postApi";
import {
  useFollowUserMutation,
  useGetMyProfileQuery,
  useGetUserProfileDetailsQuery,
  useUnfollowUserMutation,
} from "../features/users/userApi";

const PublicProfilePage = () => {
  const { displayName } = useParams();
  const { user } = useAuth();

  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileDetailsQuery(displayName);

  const { data: currentUser } = useGetMyProfileQuery();

  const [followUser, { isLoading: isFollowingUser }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowingUser }] =
    useUnfollowUserMutation();

  const { data: pinnedPostData } = useGetPostByIdQuery(
    profileData?.pinnedPost,
    {
      skip: !profileData?.pinnedPost,
    }
  );

  const [isFollowingLocal, setIsFollowingLocal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (profileData?.followers && currentUser?._id) {
      const isFollowing = profileData.followers.includes(currentUser._id);
      setIsFollowingLocal(isFollowing);
      setFollowerCount(profileData.followers.length);
    }
  }, [profileData?.followers, currentUser?._id]);

  if (isLoading) return <Spinner />;
  if (isError || !profileData)
    return <div className="text-center py-10 text-gray-700 dark:text-white">User not found</div>;

  const {
    fullName,
    displayName: name,
    profileImage,
    bannerImage,
    bio,
    aboutMe,
    socialLinks,
    expertise = [],
    readingList = [],
  } = profileData;

  const isCurrentUser = currentUser?.displayName === displayName;

  const handleFollowToggle = async () => {
    if (!displayName || !currentUser?._id) return;

    try {
      if (isFollowingLocal) {
        const res = await unfollowUser(displayName).unwrap();
        if (res.success) {
          setIsFollowingLocal(false);
          setFollowerCount((prev) => Math.max(0, prev - 1));
          refetch();
        }
      } else {
        const res = await followUser(displayName).unwrap();
        if (res.success) {
          setIsFollowingLocal(true);
          setFollowerCount((prev) => prev + 1);
          refetch();
        }
      }
    } catch (err) {
      console.error("Follow/Unfollow failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-800 dark:text-white pb-20">
      {/* Banner */}
      <div className="relative h-60 sm:h-72 bg-gray-200 dark:bg-zinc-800 rounded-b-2xl overflow-hidden shadow-sm">
        {bannerImage && (
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="relative px-6">
        <div className="absolute -top-14 sm:-top-16 left-6 sm:left-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-md z-10">
          <img
            src={
              profileImage ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Info */}
      <div className="mt-16 sm:mt-20 px-6 sm:px-10">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-3xl font-bold">{fullName}</h2>
            <p className="text-sm text-gray-600 dark:text-white">{name}</p>
          </div>

          {/* Follow Button */}
          {currentUser && !isCurrentUser && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600 dark:text-white">
                {followerCount} Followers
              </span>
              <button
                onClick={handleFollowToggle}
                disabled={isFollowingUser || isUnfollowingUser}
                className={`px-5 py-1.5 rounded-full font-medium transition border shadow-sm ${
                  isFollowingLocal
                    ? "bg-white dark:bg-zinc-900 text-gray-800 dark:text-white border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                }`}
              >
                {isFollowingUser || isUnfollowingUser
                  ? isFollowingLocal
                    ? "Unfollowing..."
                    : "Following..."
                  : isFollowingLocal
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-1">Bio</h3>
          <p className="text-gray-700 dark:text-white leading-relaxed">
            {bio || <span className="text-gray-400 dark:text-gray-500">No bio available.</span>}
          </p>
        </div>

        {/* About Me */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-1">About Me</h3>
          <p className="whitespace-pre-line text-gray-700 dark:text-white leading-relaxed">
            {aboutMe || (
              <span className="text-gray-400 dark:text-gray-500">
                No about me information available.
              </span>
            )}
          </p>
        </div>

        {/* Social Handles */}
        {socialLinks && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-1">Social Handles</h3>
            <div className="flex gap-4 mt-2">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook className="text-blue-600 hover:text-blue-800" size={22} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="text-blue-500 hover:text-blue-700" size={22} />
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer">
                  <FaGithub className="text-gray-800 dark:text-white hover:text-gray-700" size={22} />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter className="text-sky-500 hover:text-sky-700" size={22} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Expertise */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-1">Expertise</h3>
          {expertise.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {expertise.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-100 dark:bg-zinc-700 px-4 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No expertise tags available.
            </p>
          )}
        </div>

        {/* Pinned Post */}
        <div className="mt-8 max-w-md">
          <h3 className="text-xl font-semibold mb-3">📌 Pinned Post</h3>
          {pinnedPostData ? (
            <LatestPostCard post={pinnedPostData} showMenu={false} />
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No pinned post available.
            </p>
          )}
        </div>

        {/* Reading List */}
        <div className="mt-8 max-w-2xl">
          <h3 className="text-xl font-semibold mb-3">📖 Reading List</h3>
          {readingList.length > 0 ? (
            <div className="space-y-4">
              {readingList.map((postId) => (
                <ListPostCard key={postId} id={postId} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No posts in reading list yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
