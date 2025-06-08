import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrContactInfo } from "react-icons/gr";
import { useUpdateProfileDetailsMutation } from "../../features/users/userApi";

const UserContent = ({
  label,
  fieldKey,
  value,
  placeholder,
  capitalizeFirstLetter = false,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [updateProfileDetails, { isLoading }] =
    useUpdateProfileDetailsMutation();

  const handleSave = async () => {
    try {
      await updateProfileDetails({ [fieldKey]: inputValue }).unwrap();
      setEditMode(false);
      toast.success(`${label} updated successfully.`);
    } catch (error) {
      toast.error(`Failed to update ${label}.`);
    }
  };

  const handleCancel = () => {
    setInputValue(value || "");
    setEditMode(false);
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#333] pb-3 mb-4">
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold primary-font text-gray-900 dark:text-white tracking-tight">
          <GrContactInfo size={20} className="text-red-500" /> {label}
        </h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
        )}
      </div>

      {/* Content or Input Area */}
      {!editMode ? (
        value?.trim() ? (
          capitalizeFirstLetter ? (
            <div className="flex items-start gap-3 text-gray-800 dark:text-gray-300 text-base sm:text-[17px] leading-relaxed">
              <span className="text-5xl sm:text-6xl font-semibold text-blue-700 dark:text-blue-400 pt-[0.25em] font-primary">
                {value.trim().charAt(0)}
              </span>
              <p className="whitespace-pre-line pt-[1.2em] tracking-wide" style={{ lineHeight: "1.8" }}>
                {value.trim().slice(1)}
              </p>
            </div>
          ) : (
            <p className="text-gray-800 dark:text-gray-300 text-base sm:text-[17px] leading-[1.8] tracking-wide whitespace-pre-line">
              {value}
            </p>
          )
        ) : (
          <p className="italic text-sm text-gray-400">
            No {label.toLowerCase()} added. Please click the edit button to add.
          </p>
        )
      ) : (
        <div className="space-y-5">
          <textarea
            rows={5}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white text-sm sm:text-[15px] content-font tracking-wide resize-none"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition disabled:opacity-50 w-full sm:w-auto"
            >
              <Save size={16} /> {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium px-5 py-2 rounded-md transition w-full sm:w-auto"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContent;
