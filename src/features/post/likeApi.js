import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    toggleLike: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
    }),
    getLike: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/likes`, // ✅ fixed path
        method: "GET",
      }),
    }),
  }),
});

export const { useToggleLikeMutation, useGetLikeQuery } = likeApi;
