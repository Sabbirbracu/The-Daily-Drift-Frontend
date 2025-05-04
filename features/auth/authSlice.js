import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthSlice = createApi({
  reducerPath: "AuthSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthSlice;
