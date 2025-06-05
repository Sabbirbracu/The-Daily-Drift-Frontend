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
  "https://via.placeholder.com/150?text=Profile+Image";

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

  const handleShare = () => {
    setShowShareModal(true);
  };

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

  if (isLoading) return < Spinner size="lg" />;

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

      {/* Profile image + Info + Buttons */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between px-6 md:px-12 py-4 -mt-20 relative z-10">
        <div className="flex items-center gap-4 relative">
          <img
            src={profileUrl || placeholderProfile}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg object-cover"
          />
          <button
            onClick={() => profileInputRef.current.click()}
            className="absolute bottom-2 left-28 bg-white dark:bg-zinc-700 p-1 rounded-full shadow"
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
          <div>
            <h2 className="text-3xl pt-18 content-font font-bold text-gray-900 dark:text-white">
              {user?.fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {user?.displayName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user?.profileDetails.followers?.length || 0} Followers • {user?.profileDetails.following?.length || 0} Following
            </p>
          </div>
        </div>

        {/* Share button only */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-red-500  text-gray-800 dark:text-white rounded hover:bg-white dark:hover:bg-zinc-600"
          >
            Share Profile
          </button>
          {showShareModal && (
            <ShareModal
              url={`http:localhost:5173/dashboard-user/public-profile-details/${user.displayName}`}
              onClose={() => setShowShareModal(false)}
            />
          )}

        </div>
      </div>

      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white font-semibold text-lg">
            <Spinner size="lg" />
            <span className="ml-2">Uploading...</span>
        </div>
        // <Spinner size="lg" className= "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white font-semibold text-lg"/>
      )}
    </div>
  );
};

export default UpperSection;
