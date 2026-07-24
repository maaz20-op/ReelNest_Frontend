import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reel-nest-backend.vercel.app/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Following", "User"],
});
