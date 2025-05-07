// features/newsletter/newsletterApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // match your backend base URL
  }),
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation({
      query: (email) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useSubscribeToNewsletterMutation } = newsletterApi;
