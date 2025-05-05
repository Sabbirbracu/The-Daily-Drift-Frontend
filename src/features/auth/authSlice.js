// authSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthSlice = createApi({
  reducerPath: 'AuthSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAccessToken: builder.query({
      query: () => ({
        url: '/auth/access-token',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetAccessTokenQuery } = AuthSlice;
