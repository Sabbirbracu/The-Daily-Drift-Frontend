import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

// Define your API
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    getPostByUser: builder.query({
      query: () => "/posts/ownPost",
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostByUserQuery,
  useCreatePostMutation,
} = postApi;
