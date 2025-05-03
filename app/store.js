import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from "../features/api/postsApi";
import authReducer from '/Users/sabbirahmad/The Daily Drift/frontend/features/auth/authslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // add API slices later
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;