import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateProfileDetailsMutation,
} from "../../features/users/userApi";
import Spinner from "../Spinner";
import ShareModal from "../modals/shareModal"; // update the path if needed

// Cloudinary config
const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;
const cloudPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;

const placeholderBanner =
  "https://via.placeholder.com/1200x300?text=Banner+Image";
const placeholderProfile =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

// (no imports changed)

const UpperSection = () => {
  const { data: user, isLoading } = useGetMyProfileQuery();
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const [updateProfileDetails] = useUpdateProfileDetailsMutation();

  const [bannerUrl, setBannerUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setBannerUrl(user.profileDetails.bannerImage || "");
      setProfileUrl(user.profileImage || "");
    }
  }, [user]);

  const handleShare = () => setShowShareModal(true);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudPreset);
    formData.append("cloud_name", cloudName);

    const response = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return result.secure_url;
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setBannerUrl(uploadedUrl);
      await updateProfileDetails({ bannerImage: uploadedUrl });
    } catch (err) {
      console.error("Banner upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setProfileUrl(uploadedUrl);
      await updateMyProfile({ profileImage: uploadedUrl });
    } catch (err) {
      console.error("Profile image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <Spinner size="lg" />;

  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full bg-gray-200 overflow-hidden relative">
        <img
          src={bannerUrl || placeholderBanner}
          alt="Banner"
          className="object-cover w-full h-full"
        />
        <button
          onClick={() => bannerInputRef.current.click()}
          className="absolute top-2 right-2 bg-white dark:bg-zinc-700 p-2 rounded-full shadow"
          title="Edit Banner"
        >
          <FiEdit className="text-gray-700 dark:text-sky-500" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          className="hidden"
          onChange={handleBannerUpload}
        />
      </div>

      {/* Profile info section */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 px-4 sm:px-6 md:px-12 py-4 -mt-20 relative z-10">
        {/* Profile image + name */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
          <div className="relative">
            <img
              src={profileUrl || placeholderProfile}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg object-cover"
            />
            <button
              onClick={() => profileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-white dark:bg-zinc-700 p-1 rounded-full shadow"
              title="Edit Profile Picture"
            >
              <FiEdit className="text-gray-700 dark:text-sky-500" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              className="hidden"
              onChange={handleProfileUpload}
            />
          </div>
          <div className="text-center sm:text-left lg:pt-18">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {user?.fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user?.displayName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user?.profileDetails.followers?.length || 0} Followers •{" "}
              {user?.profileDetails.following?.length || 0} Following
            </p>
          </div>
        </div>

        {/* Share button */}
        <div className="w-full md:w-auto flex justify-center md:justify-end pt-0">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-red-500 text-white dark:text-white rounded hover:bg-white dark:hover:bg-zinc-600 hover:text-black transition"
          >
            Share Profile
          </button>
        </div>

        {showShareModal && (
          <ShareModal
            url={`http://localhost:5173/dashboard-user/public-profile-details/${user.displayName}`}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>

      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white font-semibold text-lg">
          <Spinner size="lg" />
          <span className="ml-2">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default UpperSection;
