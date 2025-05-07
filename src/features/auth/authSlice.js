// authSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./Api";

export const AuthSlice = createApi({
  reducerPath: "AuthSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getAccessToken: builder.query({
      query: () => ({
        url: "/auth/access-token",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetAccessTokenQuery } =
  AuthSlice;
