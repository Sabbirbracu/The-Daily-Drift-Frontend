import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAdminOverviewStats: builder.query({
      query: () => '/admin/stats/overview',
    }),
    getUserGrowthStats: builder.query({
      query: () => '/admin/stats/user-growth',
    }),
    getRoleDistributionStats: builder.query({
      query: () => '/admin/stats/role-distribution',
    }),
  }),
});

export const {
  useGetAdminOverviewStatsQuery,
  useGetUserGrowthStatsQuery,
  useGetRoleDistributionStatsQuery,
} = adminApi;
