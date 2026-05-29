import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/videos",
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
