import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Libs/Input";
import { useUpdateProfileMutation } from "../features/Profile/ProfileApi";
import useAuth from "../features/auth/hooks/useAuth";

const EditeProfile = ({ user }) => {
  const { user: User } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });
  const [updateProfile, { isError, error }] = useUpdateProfileMutation();
  const [imageLoading, setImageLoading] = useState(false);

  if (isError) {
    console.log(error);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloudName);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setFormData((prev) => ({
        ...prev,
        profileImage: result.secure_url,
      }));
      setImageLoading(false);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData).unwrap();
    if (result) {
      console.log("Saved data:", formData);
      navigate(`/dashboard-${User.role}/profile`);
    }
  };

  useEffect(() => {
    setFormData({ ...defaultFormData, ...user });
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Image */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
          />
          <div>
            <label className="block mb-2 text-sm text-gray-300 font-medium">
              {imageLoading ? "Uploading..." : "Change Profile Image"}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Personal Details */}
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="space-y-4 text-sm">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <Input
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
              <Input
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-4 text-sm">
              <Input
                label="Display Name"
                name="displayName"
                value={formData.userName}
                onChange={handleChange}
              />
              <Input
                label="Account Created"
                name="accountCreated"
                type="date"
                value={formData.accountCreated}
                onChange={handleChange}
                readOnly
              />
              <Input
                label="Last Login"
                name="lastLogin"
                type="date"
                value={formData.lastLogin}
                onChange={handleChange}
                readOnly
              />
              <Input
                label="Account Type"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                readOnly
              />
              <Input
                label="Account Verified"
                name="accountVerified"
                value={formData.accountVerified}
                onChange={handleChange}
                readOnly
              />
              <Input
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
              <Input
                label="Time Zone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="lg:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditeProfile;

const defaultFormData = {
  fullName: "",
  dob: "",
  gender: "",
  nationality: "",
  address: "",
  phone: "",
  email: "",
  userName: "",
  accountCreated: "",
  lastLogin: "",
  accountType: "",
  accountVerified: "",
  language: "",
  timezone: "",
  profileImage: "",
};
