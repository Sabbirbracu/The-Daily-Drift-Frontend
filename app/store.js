// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '/Users/sabbirahmad/The Daily Drift/frontend/features/auth/authslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // add API slices later
  },
});
