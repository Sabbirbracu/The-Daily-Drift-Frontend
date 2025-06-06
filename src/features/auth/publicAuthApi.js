// features/auth/publicAuthApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicAuthApi = createApi({
  reducerPath: "publicAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api/auth",
    // no credentials or auth headers here
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  publicAuthApi;
