// store.js
import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from '../features/auth/authSlice';
import { newsletterApi } from '../features/newsletter/newsletterApi';
import { postApi } from '../features/post/postApi';

const Store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,    
    [postApi.reducerPath]: postApi.reducer, 
    [newsletterApi.reducerPath]: newsletterApi.reducer,     
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthSlice.middleware, postApi.middleware, newsletterApi.middleware),
});

export default Store;
