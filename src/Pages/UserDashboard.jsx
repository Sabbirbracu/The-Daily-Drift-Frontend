import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import StatCard from "../components/card/StatCard";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
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
  }, [refetchTrigger]);

  // Memoize basic stats
  const totalPosts = postData?.data?.length || 0;
  const totalLikes = postData?.data?.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
  const categoryStats = useMemo(() => {
    const counts = {};
    postData?.data?.forEach((post) => {
      const cat = post.category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [postData]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Your Posts"
          value={isLoading ? "..." : totalPosts}
          icon="file-text"
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <StatCard
          title="Total Likes"
          value={isLoading ? "..." : totalLikes}
          icon="thumbs-up"
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard
          title="Categories Written"
          value={isLoading ? "..." : categoryStats.length}
          icon="list"
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PieChartComponent
          title="Posts by Category"
          data={categoryStats}
        />
        <LineChartComponent
          title="Post Growth (Mock)"
          data={[
            { month: "Jan", posts: 1 },
            { month: "Feb", posts: 2 },
            { month: "Mar", posts: 3 },
            { month: "Apr", posts: 2 },
          ]}
          xKey="month"
          yKey="posts"
        />
      </div>
    </div>
  );
};

export default UserDashboard;
