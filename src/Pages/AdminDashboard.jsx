import React from 'react';
import LineChartComponent from '../components/LineChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import StatCard from '../components/card/StatCard';
import { useGetAdminOverviewStatsQuery, useGetRoleDistributionStatsQuery } from '../features/Admin/adminApi';

const AdminDashboard = () => {
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetAdminOverviewStatsQuery();

  const {
    data: roleData,
    isLoading: roleLoading,
    isError: roleError,
  } = useGetRoleDistributionStatsQuery();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Admin 👋</h1>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value={statsLoading ? '...' : statsData?.totalUsers}
          icon="users"
          bgColor="bg-blue-100" 
          textColor="text-blue-800"
        />
        {console.log(statsData)}
        {console.log(roleData)}
        <StatCard
          title="Total Posts"
          value={statsLoading ? '...' : statsData?.totalPosts}
          icon="file-text"
          bgColor="bg-green-100" 
          textColor="text-green-800"
        />
        <StatCard
          title="Total Comments"
          value={statsLoading ? '...' : statsData?.totalComments}
          icon="message-circle"
          bgColor="bg-yellow-100" 
          textColor="text-yellow-800"
        />
        <StatCard
          title="Suspended Users"
          value={statsLoading ? '...' : statsData?.suspendedUsers}
          icon="user-x"
          bgColor="bg-red-100" 
          textColor="text-red-800"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LineChartComponent
          title="User Growth (Static Data)"
          data={[
            { month: 'Jan', users: 50 },
            { month: 'Feb', users: 80 },
            { month: 'Mar', users: 120 },
            { month: 'Apr', users: 150 },
          ]}
          xKey="month"
          yKey="users"
        />

        {/* Pie Chart for Role Distribution */}
        <PieChartComponent
          title="User Role Distribution"
          data={
            roleLoading
              ? []
              : [
                  { name: 'Admin', value: roleData?.admin || 0 },
                  { name: 'User', value: roleData?.user || 0 },
                  { name: 'Suspended', value: roleData?.suspended || 0 },
                ]
          }
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
