import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../auth/Api.js";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],

  endpoints: (builder) => ({
    // GET user profile by ID
    getProfile: builder.query({
      query: () => `users/profile`,
      providesTags: (result, error, id) => [{ type: "user", id }],
    }),

    // PUT (update) user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `users/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "user", id }],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;

// Export reducer
export const profileReducer = profileApi.reducer;
