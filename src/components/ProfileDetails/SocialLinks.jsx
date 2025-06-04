import { Plus } from "lucide-react";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useGetProfileQuery } from "../../features/Profile/ProfileApi";
import SocialLinksModal from "./SocialLinksModal";

const iconColorMap = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  github: "#333",
  reddit: "#FF4500",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  website: "#4B5563", // neutral gray for website
};


const iconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  reddit: FaReddit,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  website: FaGlobe,
};

const SocialLinks = () => {
  const { data: user, refetch } = useGetProfileQuery();
  const [modalOpen, setModalOpen] = useState(false);

  const links = user?.profileDetails?.socialLinks || {};
  const activeLinks = Object.entries(links).filter(([_, url]) => url?.trim());

  const handleModalClose = async () => {
    setModalOpen(false);
    await refetch(); // Re-fetch updated profile data
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl p-6 mb-8 shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-3 mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold primary-font text-gray-800 dark:text-white tracking-tight">
          <FaExternalLinkAlt size={20} className="text-red-500"/>Social Handles
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition flex items-center gap-1"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Content */}
      {activeLinks.length === 0 ? (
        <p className="italic text-sm text-gray-400 content-font">
          No social handles yet. To add, please click the "Add" button.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 content-font">
          {activeLinks.map(([key, url]) => {
            const Icon = iconMap[key];
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
              >
                <Icon size={20} className="" color={iconColorMap[key] || "#3B82F6"}/>
                <span className="capitalize text-sm text-gray-800 dark:text-gray-200">
                  {key}
                </span>
              </a>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <SocialLinksModal
          defaultLinks={links}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SocialLinks;
