import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfileDetailsMutation } from "../../features/users/userApi";

const ExpertiseModal = ({ defaultTags = [], onClose }) => {
  const [input, setInput] = useState(defaultTags.join(", "));
  const [updateProfileDetails, { isLoading }] = useUpdateProfileDetailsMutation();

  const handleSave = async () => {
    const tagsArray = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      await updateProfileDetails({ expertise: tagsArray }).unwrap();
      toast.success("Expertise updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update expertise.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg w-full max-w-md border border-gray-300 dark:border-gray-700 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold primary-font mb-4 text-gray-900 dark:text-white">
          Add Expertise Tags
        </h3>

        <div className="mb-4 content-font">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Expertise (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. React, Node.js, MongoDB"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
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

export default ExpertiseModal;
