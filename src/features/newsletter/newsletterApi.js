import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-daily-drift-backend-1.onrender.com/api', 
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
