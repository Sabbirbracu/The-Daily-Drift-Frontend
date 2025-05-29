// import { Link } from "react-router-dom";
// import LatestPostCard from "../components/card/LatestPostCard";
// import useAuth from "../features/auth/hooks/useAuth";
// import { useGetPostByUserQuery } from "../features/post/postApi";

// const UserDashboardPost = () => {
//   const { user } = useAuth();
//   const { isError, isLoading, error, data } = useGetPostByUserQuery();

//   return (
//     <div>
//       <div className="mb-4">
//         <Link
//           to={`/dashboard-${user.role.toLowerCase()}/create-post`}
//           className=" bg-green-500 px-4 py-2 rounded-lg"
//         >
//           Create Post
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {isLoading && <div>Loading.........</div>}

//         {isError && <div>Something went wrong! {error?.message}</div>}

//         {!isLoading &&
//           !isError &&
//           Array.isArray(data) &&
//           data.length > 0 &&
//           data.map((post) => {
//             return (
//               <div key={post._id}>
//                 <LatestPostCard post={post} showMenu={true} />
//               </div>
//             );
//           })}

//         {!isLoading && !isError && !Array.isArray(data) && (
//           <div>{data.message || "No posts found."}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboardPost;



// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import LatestPostCard from "../components/card/LatestPostCard";
// import Spinner from "../components/Spinner";
// import useAuth from "../features/auth/hooks/useAuth";
// import { useGetPostByUserQuery } from "../features/post/postApi";

// const UserDashboardPost = () => {
//   const { user } = useAuth();
//   const { isError, isLoading, error, data } = useGetPostByUserQuery();

//   return (
//     <div className="min-h-screen px-6 py-10 bg-gray-900 text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Your Posts</h1>
//         <Link
//           to={`/dashboard-${user.role.toLowerCase()}/create-post`}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           + Create New Post
//         </Link>
//       </div>

//       {isLoading && (
//         <div className="flex justify-center py-10">
//           <Spinner size="lg"/>
//         </div>
//       )}

//       {isError && (
//         <div className="text-center text-red-400 font-semibold">
//           Something went wrong! {error?.message}
//         </div>
//       )}

//       {!isLoading && !isError && Array.isArray(data) && data.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data.map((post, index) => (
//             <motion.div
//               key={post._id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.02 }}
//               className="transition-transform duration-300"
//             >
//               <LatestPostCard post={post} showMenu={true} />
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {!isLoading && !isError && Array.isArray(data) && data.length === 0 && (
//         <div className="text-center mt-20">
//           <h2 className="text-2xl font-semibold text-gray-300 mb-4">
//             You haven’t posted anything yet.
//           </h2>
//           <p className="mb-6 text-gray-400">Start sharing your thoughts now!</p>
//           <Link
//             to={`/dashboard-${user.role.toLowerCase()}/create-post`}
//             className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium"
//           >
//             Create Your First Post
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboardPost;


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LatestPostCard from "../components/card/LatestPostCard";
import Spinner from "../components/Spinner";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByUserQuery } from "../features/post/postApi";

const UserDashboardPost = () => {
  const { user } = useAuth();
  const { isError, isLoading, error, data } = useGetPostByUserQuery();

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Posts</h1>
        <Link
          to={`/dashboard-${user.role.toLowerCase()}/create-post`}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Create New Post
        </Link>
        {console.log(data)}
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="text-center text-red-400 font-semibold">
          Something went wrong! {error?.message}
        </div>
      )}

      {!isLoading && !isError && Array.isArray(data) && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <LatestPostCard post={post} showMenu={true} />
              <div className="mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    post.status === "approved"
                      ? "bg-green-600 text-white"
                      : post.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {post.status?.toUpperCase() || "UNKNOWN"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && !isError && Array.isArray(data) && data.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            You haven’t posted anything yet.
          </h2>
          <p className="mb-6 text-gray-400">Start sharing your thoughts now!</p>
          <Link
            to={`/dashboard-${user.role.toLowerCase()}/create-post`}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPost;
