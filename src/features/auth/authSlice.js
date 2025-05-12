import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => localStorage.getItem("accessToken");

const initialState = {
  token: getToken() || null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Optional: add a logout action here to remove the token
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const AuthSlice = createApi({
  reducerPath: 'AuthSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-daily-drift-backend-1.onrender.com/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
