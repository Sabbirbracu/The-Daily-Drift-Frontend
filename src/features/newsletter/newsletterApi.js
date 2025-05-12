import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api", 
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
