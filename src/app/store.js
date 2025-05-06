// store.js
import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from '../features/auth/authSlice'; // Correct path for your AuthSlice
import { postApi } from '../features/post/postApi'; // Correct path for your postsApi

const Store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,    // Adding the AuthSlice reducer
    [postApi.reducerPath]: postApi.reducer,      // Adding the postsApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthSlice.middleware, postApi.middleware),  // Adding RTK Query middleware
});

export default Store;
