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
  const [updateProfileDetails, { isLoading }] = useUpdateProfileDetailsMutation();

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
   <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl p-6 mb-10 shadow-md transition-all duration-300">
  {/* Title Row */}
  <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#333] pb-4 mb-5">
    <h2 className="flex items-center gap-2 text-xl font-bold primary-font text-gray-900 dark:text-white tracking-tight">
      <GrContactInfo size={20} className="text-red-500"/> {label}
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

  {/* Content or Input */}
  {!editMode ? (
    value?.trim() ? (
      capitalizeFirstLetter ? (
        <div className="flex items-start gap-3 content-font text-gray-800 dark:text-gray-300 text-[17px] leading-relaxed">
          <span
            className="text-6xl font-semibold text-blue-700 dark:text-blue-400 leading-[1] pt-[0.2em] font-primary"
            style={{ lineHeight: "0.95", height: "1em" }}
          >
            {value.trim().charAt(0)}
          </span>
          <p
            className="whitespace-pre-line pt-[1.35em] tracking-wide"
            style={{ lineHeight: "1.9" }}
          >
            {value.trim().slice(1)}
          </p>
        </div>
      ) : (
        <p className="content-font text-gray-800 dark:text-gray-300 text-[17px] leading-[1.9] tracking-wide whitespace-pre-line">
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
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white text-[15px] content-font tracking-wide resize-none"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition disabled:opacity-50"
        >
          <Save size={16} /> {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium px-5 py-2 rounded-md transition"
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
