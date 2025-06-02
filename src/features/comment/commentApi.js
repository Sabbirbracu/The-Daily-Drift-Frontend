import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    // ✅ Get all comments & nested replies for a post
    getComments: builder.query({
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, error, postId) =>
        result?.comments?.map((c) => ({ type: "Comment", id: c._id })) || [
          { type: "Comment", id: postId },
        ],
    }),

    // ✅ Create comment or reply
    createComment: builder.mutation({
      query: ({ postId, content, parentComment = null }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: { content, parentComment },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
    }),

    // ✅ Delete comment or reply
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

    // ✅ React to comment
    reactToComment: builder.mutation({
      query: ({ commentId, reactionType }) => ({
        url: `/comments/react/${commentId}`,
        method: "POST",
        body: { reactionType },
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", id: commentId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useReactToCommentMutation,
} = commentApi;
