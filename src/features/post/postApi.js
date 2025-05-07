
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define your API
export const postApi = createApi({

  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,

  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000', 
    credentials: 'include', 
  }),
  tagTypes: ['Post'],

  endpoints: (builder) => ({
    
    getPosts: builder.query({

      query: () => "/posts",

      query: () => '/api/posts',
      providesTags: ['Post'],

    }),
    getPostById: builder.query({
      query: (id) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    
    suspendPost: builder.mutation({
      query: (postId) => ({
        url: `/admin/posts/${postId}/suspend`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
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

  useSuspendPostMutation,

} = postApi;
