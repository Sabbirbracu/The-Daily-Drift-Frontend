import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000', 
    credentials: 'include', 
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    
    getPosts: builder.query({
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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useSuspendPostMutation,
} = postApi;
