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
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-8 md:py-10 bg-gray-900 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Your Posts</h1>
        <Link
          to={`/dashboard-${user.role.toLowerCase()}/create-post`}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition"
        >
          + Create New Post
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-red-400 font-semibold">
          Something went wrong! {error?.message}
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && !isError && Array.isArray(data) && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {data.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <LatestPostCard
                post={post}
                showMenu={true}
                style={{
                  backgroundColor: "#182131",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #2c3e50",
                }}
              />

              <div className="mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    post.status === "approved"
                      ? "bg-green-600"
                      : post.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {post.status?.toUpperCase() || "UNKNOWN"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && Array.isArray(data) && data.length === 0 && (
        <div className="text-center mt-20 px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-4">
            You haven’t posted anything yet.
          </h2>
          <p className="mb-6 text-gray-400 text-sm sm:text-base">
            Start sharing your thoughts now!
          </p>
          <Link
            to={`/dashboard-${user.role.toLowerCase()}/create-post`}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium text-sm sm:text-base"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPost;
