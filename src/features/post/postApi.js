// postApi.js (updated baseUrl)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;