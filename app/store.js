import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../features/auth/authSlice";

const Store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,
  },
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(AuthSlice.middleware),
});

export default Store;
