import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

// Define your API
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"], // Tagging posts so cache can be invalidated on changes
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    suspendPost: builder.mutation({
      query: (postId) => ({
        url: `/admin/posts/${postId}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["Post"], // Invalidate post list when a post is suspended
    }),

    getPostByUser: builder.query({
      query: () => "/posts/ownPost",
      providesTags: ["Post"], // Added: So user dashboard post list gets refreshed on changes
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"], // Optional: Add this if you want to auto-refresh after post creation
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"], //  Added: To auto-refetch posts after delete
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostByUserQuery,
  useCreatePostMutation,
  useSuspendPostMutation,
  useDeletePostMutation,
} = postApi;
