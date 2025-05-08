// src/features/users/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/admin",
    credentials: "include", 
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    unsuspendUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/unsuspend`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/make-admin`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/remove-admin`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = userApi;
