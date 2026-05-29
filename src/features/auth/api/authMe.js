import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authMeApi = createApi({
  reducerPath: "authMeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REELNEST_BACKEND_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getAuthMe: builder.query({
      query: () => "/auth/local/me",
    }),
  }),
});

export const { useGetAuthMeQuery } = authMeApi;
