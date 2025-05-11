// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import Table from "../components/table";
// import {
//   useApprovePostMutation,
//   useDeclinePostMutation,
//   useGetPostsQuery,
// } from "../features/post/postApi";

// const ManagePosts = () => {
//   const [selectedPosts, setSelectedPosts] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
  
//   const { data: posts = [], isLoading, isError } = useGetPostsQuery();
//   const [approvePost] = useApprovePostMutation();
//   const [declinePost] = useDeclinePostMutation();

//   const columns = ["Title", "Author", "Category", "Status", "CreatedAt", "Select"];
//   const toggleFields = ["status"];

//   const handleToggle = async (field, postId, currentValue) => {
//     try {
//       if (currentValue === "approved") {
//         await declinePost(postId).unwrap();
//         toast.success("Post declined");
//       } else {
//         await approvePost(postId).unwrap();
//         toast.success("Post approved");
//       }
//     } catch (err) {
//       toast.error("Failed to update status");
//       console.error(err);
//     }
//   };

//   const handleSelectPost = (postId) => {
//     setSelectedPosts((prevSelected) =>
//       prevSelected.includes(postId)
//         ? prevSelected.filter((id) => id !== postId)
//         : [...prevSelected, postId]
//     );
//   };

//   const handleBulkApprove = async () => {
//     try {
//       for (const postId of selectedPosts) {
//         await approvePost(postId).unwrap();
//       }
//       toast.success("Bulk approve successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to approve posts");
//       console.error(err);
//     }
//   };

//   const handleBulkDecline = async () => {
//     try {
//       for (const postId of selectedPosts) {
//         await declinePost(postId).unwrap();
//       }
//       toast.success("Bulk decline successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to decline posts");
//       console.error(err);
//     }
//   };

//   const filteredPosts = posts.filter((post) => {
//     if (statusFilter === "all") return true;
//     return post.status === statusFilter;
//   });

//   const transformedData = filteredPosts.map((post) => ({
//     id: post._id,
//     title: post.title,
//     author: post.author?.name || "Unknown",
//     category: post.category,
//     status: post.status,
//     createdat: new Date(post.createdAt).toLocaleDateString(),
//   }));

//   if (isLoading) return <p className="text-center mt-6 text-blue-600">Loading posts...</p>;
//   if (isError) return <p className="text-center mt-6 text-red-600">Failed to load posts</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="text-lg">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="ml-2 p-2 rounded border border-gray-300"
//         >
//           <option value="all">All</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//           <option value="declined">Declined</option>
//         </select>
//       </div>

//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex gap-2">
//           <button
//             onClick={handleBulkApprove}
//             disabled={selectedPosts.length === 0}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Approve
//           </button>
//           <button
//             onClick={handleBulkDecline}
//             disabled={selectedPosts.length === 0}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Decline
//           </button>
//         </div>
//         <div>
//           <span className="text-sm">{selectedPosts.length} selected</span>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         data={transformedData}
//         toggleFields={toggleFields}
//         onToggle={handleToggle}
//         onSelect={handleSelectPost}
//         selectedPosts={selectedPosts}
//         selectable={true} // Pass 'true' to enable selection functionality
//       />
//     </div>
//   );
// };

// export default ManagePosts;


// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import Table from "../components/table";
// import {
//   useApprovePostMutation,
//   useDeclinePostMutation,
//   useGetPendingPostsQuery,
//   useGetPostsQuery,
// } from "../features/post/postApi";

// const ManagePosts = () => {
//   const [selectedPosts, setSelectedPosts] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Fetch posts based on filter status
//   const { data: posts = [], isLoading, isError } = 
//     statusFilter === "pending" ? useGetPendingPostsQuery() : useGetPostsQuery();

//   const [approvePost] = useApprovePostMutation();
//   const [declinePost] = useDeclinePostMutation();

//   const columns = ["Title", "Author", "Category", "Status", "CreatedAt", "Select"];
//   const toggleFields = ["status"];

//   // Handle toggle post status
//   const handleToggle = async (field, postId, currentValue) => {
//     try {
//       if (currentValue === "approved") {
//         await declinePost(postId).unwrap();
//         toast.success("Post declined");
//       } else {
//         await approvePost(postId).unwrap();
//         toast.success("Post approved");
//       }
//     } catch (err) {
//       toast.error("Failed to update status");
//       console.error(err);
//     }
//   };

//   // Handle selecting a post
//   const handleSelectPost = (postId) => {
//     setSelectedPosts((prevSelected) =>
//       prevSelected.includes(postId)
//         ? prevSelected.filter((id) => id !== postId)
//         : [...prevSelected, postId]
//     );
//   };

//   // Bulk approve selected posts
//   const handleBulkApprove = async () => {
//     try {
//       for (const postId of selectedPosts) {
//         await approvePost(postId).unwrap();
//       }
//       toast.success("Bulk approve successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to approve posts");
//       console.error(err);
//     }
//   };

//   // Bulk decline selected posts
//   const handleBulkDecline = async () => {
//     try {
//       for (const postId of selectedPosts) {
//         await declinePost(postId).unwrap();
//       }
//       toast.success("Bulk decline successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to decline posts");
//       console.error(err);
//     }
//   };

//   // Log the status of posts for debugging
//   console.log(posts.map(post => post.status));

//   // Filter posts by status
//   const filteredPosts = posts.filter((post) => {
//     if (statusFilter === "all") return true;
//     return post.status === statusFilter;
//   });

//   // Transform data for the table
//   const transformedData = filteredPosts.map((post) => ({
//     id: post._id,
//     title: post.title,
//     author: post.author?.name || "Unknown",
//     category: post.category,
//     status: post.status,
//     createdat: new Date(post.createdAt).toLocaleDateString(),
//   }));

//   // Loading and error states
//   if (isLoading) return <p className="text-center mt-6 text-blue-600">Loading posts...</p>;
//   if (isError) return <p className="text-center mt-6 text-red-600">Failed to load posts</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="text-lg">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="ml-2 p-2 rounded border border-gray-300"
//         >
//           <option value="all">All</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//           <option value="declined">Declined</option>
//         </select>
//       </div>

//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex gap-2">
//           <button
//             onClick={handleBulkApprove}
//             disabled={selectedPosts.length === 0}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Approve
//           </button>
//           <button
//             onClick={handleBulkDecline}
//             disabled={selectedPosts.length === 0}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Decline
//           </button>
//         </div>
//         <div>
//           <span className="text-sm">{selectedPosts.length} selected</span>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         data={transformedData}
//         toggleFields={toggleFields}
//         onToggle={handleToggle}
//         onSelect={handleSelectPost}
//         selectedPosts={selectedPosts}
//         selectable={true} // Pass 'true' to enable selection functionality
//       />
//     </div>
//   );
// };

// export default ManagePosts;


// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import Table from "../components/table";
// import {
//   useApprovePostMutation,
//   useDeclinePostMutation,
//   useGetPostsQuery,
// } from "../features/post/postApi";

// const ManagePosts = () => {
//   const [selectedPosts, setSelectedPosts] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Fetch posts based on current filter
//   const {
//     data: posts = [],
//     isLoading,
//     isError,
//   } = useGetPostsQuery(
//     statusFilter === "all" ? {} : { status: statusFilter }
//   );

//   const [approvePost] = useApprovePostMutation();
//   const [declinePost] = useDeclinePostMutation();

//   const columns = ["Title", "Author", "Category", "Status", "CreatedAt", "Select"];
//   const toggleFields = ["status"];

//   const handleToggle = async (field, postId, currentValue) => {
//     try {
//       if (currentValue === "approved") {
//         await declinePost(postId).unwrap();
//         toast.success("Post declined");
//       } else {
//         await approvePost(postId).unwrap();
//         toast.success("Post approved");
//       }
//     } catch (err) {
//       toast.error("Failed to update status");
//       console.error(err);
//     }
//   };

//   const handleSelectPost = (postId) => {
//     setSelectedPosts((prev) =>
//       prev.includes(postId)
//         ? prev.filter((id) => id !== postId)
//         : [...prev, postId]
//     );
//   };

//   const handleBulkApprove = async () => {
//     try {
//       await Promise.all(
//         selectedPosts.map((id) => approvePost(id).unwrap())
//       );
//       toast.success("Bulk approve successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to approve posts");
//       console.error(err);
//     }
//   };

//   const handleBulkDecline = async () => {
//     try {
//       await Promise.all(
//         selectedPosts.map((id) => declinePost(id).unwrap())
//       );
//       toast.success("Bulk decline successful");
//       setSelectedPosts([]);
//     } catch (err) {
//       toast.error("Failed to decline posts");
//       console.error(err);
//     }
//   };

//   const transformedData = posts.map((post) => ({
//     id: post._id,
//     title: post.title,
//     author: post.author?.name || "Unknown",
//     category: post.category,
//     status: post.status,
//     createdat: new Date(post.createdAt).toLocaleDateString(),
//   }));

//   if (isLoading)
//     return <p className="text-center mt-6 text-blue-600">Loading posts...</p>;
//   if (isError)
//     return <p className="text-center mt-6 text-red-600">Failed to load posts</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="text-lg">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="ml-2 p-2 rounded border border-gray-300"
//         >
//           <option value="all">All</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//           <option value="declined">Declined</option>
//         </select>
//       </div>

//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex gap-2">
//           <button
//             onClick={handleBulkApprove}
//             disabled={selectedPosts.length === 0}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Approve
//           </button>
//           <button
//             onClick={handleBulkDecline}
//             disabled={selectedPosts.length === 0}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Bulk Decline
//           </button>
//         </div>
//         <div>
//           <span className="text-sm">{selectedPosts.length} selected</span>
//         </div>
//       </div>

//       <Table
//         columns={columns}
//         data={transformedData}
//         toggleFields={toggleFields}
//         onToggle={handleToggle}
//         onSelect={handleSelectPost}
//         selectedPosts={selectedPosts}
//         selectable={true}
//       />
//     </div>
//   );
// };

// export default ManagePosts;



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

  // Fetch all posts with optional status filter
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetPostsQuery({ status: statusFilter === "all" ? undefined : statusFilter });

  const [approvePost] = useApprovePostMutation();
  const [declinePost] = useDeclinePostMutation();

  const columns = ["Title", "Author", "Category", "Status", "CreatedAt", "Select"];

  // Handle dropdown status change
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
    author: post.author?.name || "Unknown",
    category: post.category,
    status: post.status,
    createdat: new Date(post.createdAt).toLocaleDateString(),
  }));

  if (isLoading)
    return <p className="text-center mt-6 text-blue-600">Loading posts...</p>;
  if (isError)
    return <p className="text-center mt-6 text-red-600">Failed to load posts</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="text-lg">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-2 p-2 rounded border border-gray-300"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleBulkApprove}
            disabled={selectedPosts.length === 0}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Bulk Approve
          </button>
          <button
            onClick={handleBulkDecline}
            disabled={selectedPosts.length === 0}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Bulk Decline
          </button>
        </div>
        <div>
          <span className="text-sm">{selectedPosts.length} selected</span>
        </div>
      </div>

      <Table
        columns={columns}
        data={transformedData}
        selectFields={["status"]} // 👈 Replace toggle with select
        onSelectChange={handleStatusChange} // 👈 Handles <select> changes
        onSelect={handleSelectPost}
        selectedPosts={selectedPosts}
        selectable={true}
      />
    </div>
  );
};

export default ManagePosts;
