import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/admin",
    credentials: "include",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    suspendComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useSuspendCommentMutation } = commentApi;
