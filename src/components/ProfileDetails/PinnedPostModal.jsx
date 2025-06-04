import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetPostByUserQuery } from "../../features/post/postApi";
import { useUpdateProfileDetailsMutation } from "../../features/users/userApi";
import ListPostCard from "../card/ListPostCard";
import Spinner from "../Spinner"; // ✅ Make sure Spinner is available

const PinnedPostModal = ({ onClose, refetchProfile }) => {
  const {
    data: posts = [],
    isLoading: isFetching,
    isError,
    error,
  } = useGetPostByUserQuery();

  const [selectedPost, setSelectedPost] = useState(null);
  const [updateProfileDetails, { isLoading: isSaving }] =
    useUpdateProfileDetailsMutation();

  const handleSave = async () => {
    try {
      await updateProfileDetails({ pinnedPost: selectedPost }).unwrap();
      toast.success("Pinned post updated!");
      refetchProfile();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update pinned post.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg w-full max-w-2xl border border-gray-300 dark:border-gray-700 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Select a Post to Pin
        </h3>

        {/* Loading */}
        {isFetching && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="text-sm text-red-500">
            Failed to load your posts. {error?.message}
          </p>
        )}

        {/* Post List */}
        {!isFetching && !isError && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => setSelectedPost(post._id)}
                className={`cursor-pointer border px-3 py-2 rounded-md transition ${
                  selectedPost === post._id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <ListPostCard
                  id={post._id}
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  createdAt={post.createdAt}
                />
              </div>
            ))}

            {posts.length === 0 && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                You don’t have any posts to pin.
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!selectedPost || isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
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

export default PinnedPostModal;
