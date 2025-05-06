// src/features/api/postApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query and configure API slice
export const postApi = createApi({
  reducerPath: "postApi", // Name for the slice
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Your API base URL
  endpoints: (builder) => ({
    // Get posts
    getPosts: builder.query({
      query: () => "/posts", // Define the endpoint URL
    }),
    // Create a new post
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost, // Data to send in the request
      }),
    }),
    // Delete a post
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;

export default postApi;
