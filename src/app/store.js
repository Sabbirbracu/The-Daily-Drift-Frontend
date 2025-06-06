import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../features/admin/adminApi";
import { AuthSlice } from "../features/auth/authSlice";
import { publicAuthApi } from "../features/auth/publicAuthApi"; // ✅ NEW
import { categoryApi } from "../features/category/categoryApi";
import { commentApi } from "../features/comment/commentApi";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import { newsletterApi } from "../features/newsletter/newsletterApi";
import { likeApi } from "../features/post/likeApi";
import { postApi } from "../features/post/postApi";
import { profileApi } from "../features/Profile/ProfileApi";
import uiReducer from "../features/ui/uiSlice"; // ✅ NEW
import { userApi } from "../features/users/userApi";
const Store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    ui: uiReducer,
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [publicAuthApi.reducerPath]: publicAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicAuthApi.middleware,
      AuthSlice.middleware,
      adminApi.middleware,
      userApi.middleware,
      postApi.middleware,
      newsletterApi.middleware,
      commentApi.middleware,
      likeApi.middleware,
      profileApi.middleware,
      categoryApi.middleware
    ),
});

export default Store;
