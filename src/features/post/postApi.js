import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

// Define your API
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "ownPost"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",

      providesTags: ["Post"],
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
      invalidatesTags: ["Post"],
    }),
    getPostByUser: builder.query({
      query: () => "/posts/ownPost",

      providesTags: (result) =>
        Array.isArray(result?.data)
          ? [
              ...result.data.map(({ _id }) => ({ type: "ownPost", id: _id })),
              { type: "ownPost", id: "LIST" },
            ]
          : [{ type: "ownPost", id: "LIST" }],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post", "ownPost"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post", "ownPost"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "ownPost", id },
        { type: "ownPost", id: "LIST" },
      ],
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
  useUpdatePostMutation,
} = postApi;
