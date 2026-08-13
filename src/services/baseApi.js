import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_BACKEND_URL_DEVELOPMENT ||
      import.meta.env.VITE_REELNEST_BACKEND_URL_RAILWAY_SERVER,
    credentials: "include",
  }),

  endpoints: () => ({}),
  tagTypes: ["Following", "User"],
});
