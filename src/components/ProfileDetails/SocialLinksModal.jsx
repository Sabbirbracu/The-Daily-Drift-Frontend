import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfileDetailsMutation } from "../../features/users/userApi";

// Added 'website' to the list
const platforms = ["facebook", "instagram", "linkedin", "github", "reddit", "twitter", "youtube", "website"];

const SocialLinksModal = ({ defaultLinks = {}, onClose }) => {
  const [form, setForm] = useState({ ...defaultLinks });
  const [updateProfileDetails, { isLoading }] = useUpdateProfileDetailsMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfileDetails({ socialLinks: form }).unwrap();
      toast.success("Social links updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update social links.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg w-full max-w-md border border-gray-300 dark:border-gray-700 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold primary-font mb-4 text-gray-900 dark:text-white">
          Add Social Handles
        </h3>

        {/* Input Fields */}
        <div className="space-y-4 content-font">
          {platforms.map((platform) => (
            <div key={platform}>
              <label className="block text-sm capitalize text-gray-700 dark:text-gray-300 mb-1">
                {platform === "website" ? "Website" : platform}
              </label>
              <input
                type="url"
                name={platform}
                value={form[platform] || ""}
                onChange={handleChange}
                placeholder={
                  platform === "website"
                    ? "https://your-website.com"
                    : `https://${platform}.com/your-username`
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksModal;
