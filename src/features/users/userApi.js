import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../features/auth/Api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAllUsersQuery,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = userApi;
