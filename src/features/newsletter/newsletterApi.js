// features/newsletter/newsletterApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation({
      query: (email) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const { useSubscribeToNewsletterMutation } = newsletterApi;
