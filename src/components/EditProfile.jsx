import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Input from "../Libs/Input";
import Spinner from "../components/Spinner";
import { useUpdateProfileMutation } from "../features/Profile/ProfileApi";
import useAuth from "../features/auth/hooks/useAuth";


// Component to edit the user's profile
const EditeProfile = ({ user }) => {
  const { user: User } = useAuth(); // Authenticated user from global state
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });

  // RTK Query mutation for profile update
  const [updateProfile, { isError, error }] = useUpdateProfileMutation();

  const [imageLoading, setImageLoading] = useState(false); // Loading state for profile image upload

  const fallbackAvatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Handle API errors
  if (isError) {
    console.log(error);
  }

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cloudinary config from environment
  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Handle image upload to Cloudinary
  const handleImageChange = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", preset);
    formDataUpload.append("cloud_name", cloudName);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formDataUpload,
      });
      const result = await res.json();
      setFormData((prev) => ({
        ...prev,
        profileImage: result.secure_url,
      }));
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    } finally {
      setImageLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData).unwrap();
    if (result) {
      console.log("Saved data:", formData);
      navigate(`/dashboard-${User.role}/profile`);
    }
  };

  // Update form data when `user` prop changes
  useEffect(() => {
    setFormData({ ...defaultFormData, ...user });
  }, [user]);

  // Format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toISOString().split("T")[0];
  };

  const languageOptions = [
    { value: "English", label: "🇺🇸 English" },
    { value: "Bangla", label: "🇧🇩 Bangla (বাংলা)" },
    { value: "Hindi", label: "🇮🇳 Hindi (हिन्दी)" },
    { value: "Arabic", label: "🇸🇦 Arabic (العربية)" },
    { value: "Spanish", label: "🇪🇸 Spanish (Español)" },
    { value: "French", label: "🇫🇷 French (Français)" },
    { value: "German", label: "🇩🇪 German (Deutsch)" },
    { value: "Chinese", label: "🇨🇳 Chinese (中文)" },
    { value: "Japanese", label: "🇯🇵 Japanese (日本語)" },
    { value: "Russian", label: "🇷🇺 Russian (Русский)" },
    { value: "Urdu", label: "🇵🇰 Urdu (اردو)" },
    { value: "Turkish", label: "🇹🇷 Turkish (Türkçe)" },
    { value: "Portuguese", label: "🇵🇹 Portuguese (Português)" },
    { value: "Korean", label: "🇰🇷 Korean (한국어)" },
    { value: "Persian", label: "🇮🇷 Persian (فارسی)" },
    { value: "Italian", label: "🇮🇹 Italian (Italiano)" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // Tailwind gray-800
      borderColor: "#374151",     // Tailwind gray-700
      color: "white",
      minHeight: "44px",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // Tailwind gray-800
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#4b5563" : "#1f2937", // Focus: gray-600, base: gray-800
      color: "white",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", // Tailwind gray-400
    }),
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Image Upload Section */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={formData.profileImage || fallbackAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
          />
          <div>
            <label className="block mb-2 text-sm text-gray-300 font-medium">
              {imageLoading ? <Spinner size="sm" /> : "Change Profile Image"}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={imageLoading}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* Profile Form */}
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Personal Details Section */}
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
                value={formatDate(formData.dob)}
                onChange={handleChange}
              />
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="gender">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
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
                readOnly
              />
            </div>
          </div>

          {/* Account Details Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-4 text-sm">
              <Input
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                readOnly
              />
              <Input
                label="Account Created"
                name="accountCreated"
                type="date"
                value={formatDate(formData.accountCreated)}
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
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="timezone">
                  Time Zone
                </label>
                <select
                  name="timezone"
                  id="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GMT">GMT</option>
                  <option value="UTC">UTC</option>
                  <option value="PST">PST</option>
                  <option value="EST">EST</option>
                  {/* Add more timezones as needed */}
                </select>
              </div>
              <Select
                options={languageOptions}
                value={languageOptions.find((opt) => opt.value === formData.language)}
                onChange={(selected) =>
                  handleChange({ target: { name: "language", value: selected.value } })
                }
                styles={customStyles}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              disabled={imageLoading}
            >
              {imageLoading ? <Spinner size="sm" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditeProfile;

// ✅ Default form values (includes displayName instead of userName)
const defaultFormData = {
  fullName: "",
  dob: "",
  gender: "male",
  nationality: "",
  address: "",
  phone: "",
  email: "",
  displayName: "", // ✅ Updated from userName
  accountCreated: "",
  lastLogin: "",
  accountType: "",
  accountVerified: "",
  language: "",
  timezone: "GMT",
  profileImage: "",
};
