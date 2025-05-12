// // authSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const initialState = {
//   token: null,  // Store token here
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;  // Store the token
//     },
//     clearToken: (state) => {
//       state.token = null;  // Clear the token
//     },
//   },
// });

// export const { setToken, clearToken } = authSlice.actions;

// export const AuthSlice = createApi({
//   reducerPath: 'AuthSlice',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (user) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     getAccessToken: builder.query({
//       query: () => ({
//         url: '/auth/access-token',
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation, useGetAccessTokenQuery } = AuthSlice;

// export default authSlice.reducer;


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
    baseUrl: 'http://localhost:5000/api',
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
