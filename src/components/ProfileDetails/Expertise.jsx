import { Plus } from "lucide-react";
import { useState } from "react";
import { FaTags } from "react-icons/fa6";
import { useGetProfileQuery } from "../../features/Profile/ProfileApi";
import ExpertiseModal from "./ExpertiseModal";

const Expertise = () => {
  const { data: user, refetch } = useGetProfileQuery();
  const [modalOpen, setModalOpen] = useState(false);

  const expertiseList = user?.profileDetails?.expertise || [];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl p-6 mb-8 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-3 mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold primary-font text-gray-800 dark:text-white tracking-tight">
          <FaTags size={20} className="text-red-500"/>Expertise / Tags
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition flex items-center gap-1"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Content */}
      {expertiseList.length === 0 ? (
        <p className="italic text-sm text-gray-400 content-font">
          No expertise tags yet. To add, please click the "Add" button.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 content-font">
          {expertiseList.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <ExpertiseModal
          defaultTags={expertiseList}
          onClose={() => {
            setModalOpen(false);
            refetch(); // Refresh the section immediately after saving
          }}
        />
      )}
    </div>
  );
};

export default Expertise;
