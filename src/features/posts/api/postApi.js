import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REELNEST_BACKEND_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => ({
        url: "/posts/videos",
        method: "GET",
        params: queryParams,
      }),
    }),
  }),
});

export const { useLazyGetPostsQuery } = postApi;
