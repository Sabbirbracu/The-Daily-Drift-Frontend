import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Comment", id: postId }],
    }),
    createComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Comment", id: postId }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
