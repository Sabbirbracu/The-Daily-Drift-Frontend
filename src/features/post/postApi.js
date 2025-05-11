import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    // Get posts by optional status or search (approved, pending, declined)
    getPosts: builder.query({
      query: ({ search = "", status } = {}) => ({
        url: "/posts",
        params: { search, status },
      }),
      providesTags: ["Post"],
    }),

    // Get only approved posts (public access for Home page)
    getPublicPosts: builder.query({
      query: (search = "") => ({
        url: "/posts/publicPosts",
        params: { search },
      }),
      providesTags: ["Post"],
    }),

    // Get single post by ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Get current user's posts
    getPostByUser: builder.query({
      query: () => "/posts/ownPost",
      providesTags: ["Post"],
    }),

    // Create post
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // Update post
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // Delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    // Like or unlike post
    toggleLikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Get post like count
    getPostLikes: builder.query({
      query: (id) => `/posts/${id}/likes`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Vote in a poll
    votePoll: builder.mutation({
      query: ({ postId, pollId, optionIndex }) => ({
        url: `/posts/${postId}/poll/${pollId}/vote`,
        method: "POST",
        body: { optionIndex },
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Post", id: postId }],
    }),

    // Admin: approve post
    approvePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),

    // Admin: decline post
    declinePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/decline`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPublicPostsQuery,
  useGetPostByIdQuery,
  useGetPostByUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useToggleLikePostMutation,
  useGetPostLikesQuery,
  useVotePollMutation,
  useApprovePostMutation,
  useDeclinePostMutation,
} = postApi;

export const postReducer = postApi.reducer;
