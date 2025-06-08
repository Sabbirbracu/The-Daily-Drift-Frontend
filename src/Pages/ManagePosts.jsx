import { useState } from "react";
import { toast } from "react-hot-toast";
import Table from "../components/table";
import {
  useApprovePostMutation,
  useDeclinePostMutation,
  useGetPostsQuery,
} from "../features/post/postApi";

const ManagePosts = () => {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetPostsQuery({ status: statusFilter === "all" ? undefined : statusFilter });

  const [approvePost] = useApprovePostMutation();
  const [declinePost] = useDeclinePostMutation();

  const columns = ["Title", "Author", "Category", "Status", "CreatedAt", "Select"];

  const handleStatusChange = async (field, postId, newValue) => {
    try {
      if (newValue === "approved") {
        await approvePost(postId).unwrap();
        toast.success("Post approved");
      } else if (newValue === "declined") {
        await declinePost(postId).unwrap();
        toast.success("Post declined");
      } else {
        toast("Pending status is default and does not require update.");
      }
    } catch (err) {
      toast.error("Failed to update post status");
      console.error(err);
    }
  };

  const handleSelectPost = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleBulkApprove = async () => {
    try {
      for (const postId of selectedPosts) {
        await approvePost(postId).unwrap();
      }
      toast.success("Bulk approve successful");
      setSelectedPosts([]);
    } catch (err) {
      toast.error("Failed to approve posts");
      console.error(err);
    }
  };

  const handleBulkDecline = async () => {
    try {
      for (const postId of selectedPosts) {
        await declinePost(postId).unwrap();
      }
      toast.success("Bulk decline successful");
      setSelectedPosts([]);
    } catch (err) {
      toast.error("Failed to decline posts");
      console.error(err);
    }
  };

  const transformedData = posts.map((post) => ({
    id: post._id,
    title: post.title,
    author: post.author?.displayName || "Unknown",
    category: post.category,
    status: post.status,
    createdat: new Date(post.createdAt).toLocaleDateString(),
  }));

  if (isLoading)
    return <p className="text-center mt-6 text-blue-600">Loading posts...</p>;
  if (isError)
    return <p className="text-center mt-6 text-red-600">Failed to load posts</p>;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Manage Posts</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <label htmlFor="statusFilter" className="block text-lg font-medium mb-1">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded border border-gray-300 w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <button
            onClick={handleBulkApprove}
            disabled={selectedPosts.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Bulk Approve
          </button>
          <button
            onClick={handleBulkDecline}
            disabled={selectedPosts.length === 0}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Bulk Decline
          </button>
          <span className="text-sm text-gray-500">
            {selectedPosts.length} selected
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-lg shadow">
        <Table
          columns={columns}
          data={transformedData}
          selectFields={["status"]}
          onSelectChange={handleStatusChange}
          onSelect={handleSelectPost}
          selectedPosts={selectedPosts}
          selectable={true}
        />
      </div>
    </div>
  );
};

export default ManagePosts;