import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../features/auth/Api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Leaderboard", "TopAuthors"],
  endpoints: (builder) => ({
    // ✅ Admin endpoints
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),

    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    unsuspendUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/unsuspend`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/make-admin`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/make-user`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Current logged-in user
    getMyProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),

    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateProfileDetails: builder.mutation({
      query: (data) => ({
        url: "/users/profile/details",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Public profile (viewing other users)
    getUserProfileDetails: builder.query({
      query: (displayName) => `/users/${displayName}`,
      providesTags: (result, error, displayName) => [
        { type: "User", id: displayName },
      ],
    }),

    // ✅ Follow user
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Unfollow user
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/unfollow`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Leaderboard
    getLeaderboard: builder.query({
      query: () => "/users/leaderboard",
      providesTags: ["Leaderboard"],
    }),

    // ✅ Top authors
    getTopAuthors: builder.query({
      query: () => "/users/top-authors",
      providesTags: ["TopAuthors"],
    }),
  }),
});

export const {
  // Admin
  useGetAllUsersQuery,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,

  // Current user
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateProfileDetailsMutation,

  // Public profile
  useGetUserProfileDetailsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,

  // Stats
  useGetLeaderboardQuery,
  useGetTopAuthorsQuery,
} = userApi;
