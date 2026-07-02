import { apiSlice } from "../baseApi";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsComments: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
    }),
  }),
});

export const { useGetPostsCommentsQuery } = commentApi;
