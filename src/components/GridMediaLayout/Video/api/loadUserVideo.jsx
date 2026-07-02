import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loadUserGridVideo = createApi({
  reducerPath: "userGridVideo",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REELNEST_BACKEND_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({}),
});
