import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../../features/posts/api/postApi";
import { authMeApi } from "../../features/auth/api/authMe";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [authMeApi.reducerPath]: authMeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, authMeApi.middleware),
});
