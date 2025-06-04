import { Pin, Plus } from "lucide-react";
import { useState } from "react";
import { useGetPostByIdQuery } from "../../features/post/postApi";
import { useGetMyProfileQuery } from "../../features/users/userApi";
import ListPostCard from "../card/ListPostCard";
import PinnedPostModal from "./PinnedPostModal";

const PinnedPost = () => {
  const { data, refetch } = useGetMyProfileQuery();
  const pinnedPostId = data?.profileDetails?.pinnedPost;

  const { data: postData } = useGetPostByIdQuery(pinnedPostId, {
    skip: !pinnedPostId,
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-3 mb-4">
        <h2 className="text-xl font-bold primary-font text-gray-800 dark:text-white flex items-center gap-2">
          <Pin size={20} className="text-red-500 " /> Pinned Post
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 flex items-center gap-1"
        >
          <Plus size={18} /> Pinned Post
        </button>
      </div>

      {!pinnedPostId ? (
        <p className="italic text-sm text-gray-400">
          No pinned post yet. Click "+ Pinned Post" to pin one.
        </p>
      ) : postData ? (
        <ListPostCard
          id={postData._id}
          title={postData.title}
          image={postData.image}
          category={postData.category}
          createdAt={postData.createdAt}
        />
      ) : null}

      {modalOpen && (
        <PinnedPostModal onClose={() => setModalOpen(false)} refetchProfile={refetch} />
      )}
    </div>
  );
};

export default PinnedPost;
