import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

// Define your API
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    // ✅ GET all posts for public/all post listing
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Post", id: _id })), "Post"]
          : ["Post"],
    }),

    // ✅ GET single post by ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // ✅ GET posts for logged-in user
    getPostByUser: builder.query({
      query: () => "/posts/ownPost",
      providesTags: ["Post"],
    }),

    // ✅ CREATE a new post
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // ✅ DELETE a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    // ✅ SUSPEND a post (admin only)
    suspendPost: builder.mutation({
      query: (postId) => ({
        url: `/admin/posts/${postId}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["Post"],
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

export const postReducer = postApi.reducer;

export const {
  getPosts,
  getPostById,
  getPostByUser,
  createPost,
  suspendPost,
  deletePost,
} = postApi.endpoints;
