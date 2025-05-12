import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../features/Admin/adminApi';
import { AuthSlice } from '../features/auth/authSlice';
import { commentApi } from '../features/comment/commentApi';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import { newsletterApi } from '../features/newsletter/newsletterApi';
import { likeApi } from '../features/post/likeApi';
import { postApi } from '../features/post/postApi';
import { userApi } from '../features/users/userApi';

const Store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer, // add likeApi reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthSlice.middleware,
      adminApi.middleware,
      userApi.middleware,
      postApi.middleware,
      newsletterApi.middleware,
      commentApi.middleware,
      likeApi.middleware // add likeApi middleware here
    ),
});

export default Store;
