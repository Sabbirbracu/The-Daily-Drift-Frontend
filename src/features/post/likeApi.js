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
  }),
});

export const { useToggleLikeMutation } = likeApi;
