import { RotateCcw } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListPostCard from "../components/card/ListPostCard";
import StatCard from "../components/card/StatCard";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import Spinner from "../components/Spinner"; // make sure Spinner component exists
import { Button } from "../components/ui/button"; // using your default button base
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByUserQuery } from "../features/post/postApi";

const UserDashboard = () => {
  const refetchTrigger = useSelector((state) => state.dashboard.refetchTrigger);
  const {
    data: postData,
    isLoading,
    refetch,
  } = useGetPostByUserQuery();

  useEffect(() => {
    refetch();
  }, [refetchTrigger, refetch]);

  const { user } = useAuth();
  const posts = postData || [];

  // Memoize stats
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
  const categoryStats = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      const cat = post.category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [posts]);

  // Get Top Liked Post
  const topLikedPost = useMemo(() => {
    if (!posts.length) return null;
    return posts.reduce((max, post) =>
      post.likes?.length > (max?.likes?.length || 0) ? post : max
    );
  }, [posts]);

  // Mock growth data (use real dates later)
  const growthData = useMemo(() => {
    const monthlyCount = {};
    posts.forEach((post) => {
      const month = new Date(post.createdAt).toLocaleString("default", { month: "short" });
      monthlyCount[month] = (monthlyCount[month] || 0) + 1;
    });
    return Object.entries(monthlyCount).map(([month, posts]) => ({ month, posts }));
  }, [posts]);

  // Prepare recent posts sorted by newest first, limited to 5
  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [posts]);

  return (
    <div className="p-6 md:p-10 min-h-screen rounded-md bg-gray-900">
      {/* Header */}
      <div className="relative mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Welcome Back 👋</h1>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="flex text-white items-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-black transition"
          >
            <RotateCcw size={18} />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatCard
              title="Your Posts"
              value={totalPosts}
              icon="file-text"
              bgColor="bg-blue-100"
              textColor="text-blue-800"
            />
            <StatCard
              title="Total Likes"
              value={totalLikes}
              icon="thumbs-up"
              bgColor="bg-green-100"
              textColor="text-green-800"
            />
            <StatCard
              title="Categories Written"
              value={categoryStats.length}
              icon="list"
              bgColor="bg-purple-100"
              textColor="text-purple-800"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Posts by Category</h3>
              <PieChartComponent
                title="Posts by Category"
                data={categoryStats.length > 0 ? categoryStats : [{ name: "No Data", value: 1 }]}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Post Growth Over Time</h3>
              <LineChartComponent
                title="Post Growth Over Time"
                data={growthData}
                xKey="month"
                yKey="posts"
              />
            </div>
          </div>

          {/* Top Liked Post */}
          {topLikedPost && topLikedPost.likes?.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-3 text-zinc-900">
                🔥 Top Liked Post
              </h2>
              <p className="text-lg font-medium text-blue-600">
                {topLikedPost.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Likes: {topLikedPost.likes.length}
              </p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-md mb-10 border border-dashed border-gray-300 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                😔 No Top Liked Post Yet
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                It looks like none of your posts have received likes yet.
              </p>
              <p className="text-sm text-gray-500 mb-5">
                Create awesome content and share it with your friends to get more engagement!
              </p>
              <Link
                to={`/dashboard-${user.role.toLowerCase()}/create-post`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                ✍️ Create Post
              </Link>
            </div>
          )}

          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🕒 Recent Posts</h2>
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <ListPostCard
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    image={post.image}
                    category={post.category}
                    createdAt={post.createdAt}
                    style={{color: 'black', textDecoration: 'none'}}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent posts available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
