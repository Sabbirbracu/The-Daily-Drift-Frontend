import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    suspendComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["Comment"],
    }),
    getCommtents: builder.query({
      query: (postId) => `/comments/${postId}`,
    }),
    createComment: builder.mutation({
      query: (postId, ...comment) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: comment,
      }),
    }),
  }),
});

export const {
  useSuspendCommentMutation,
  useGetCommtentsQuery,
  useCreateCommentMutation,
} = commentApi;
