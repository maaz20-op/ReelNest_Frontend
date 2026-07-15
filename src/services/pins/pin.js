import { apiSlice } from "../baseApi";

const pinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSavedVideoPosts: builder.query({
      query: () => ({
        url: "/pins/video",
        method: "GET",
      }),
    }),

    getSavedImagePosts: builder.query({
      query: () => ({
        url: "/pins/image",
        method: "GET",
      }),
    }),

    createUserSavedPins: builder.mutation({
      query: (postId) => ({
        url: "/pins",
        method: "POST",
        body: {
          postId: postId,
        },
      }),
    }),

    deleteSavedPost: builder.mutation({
      query: (postId) => ({
        url: `/pins/${postId}`,
      }),
    }),
  }),
});

export const {
  useGetSavedVideoPostsQuery,
  useGetSavedImagePostsQuery,
  useCreateUserSavedPinsMutation,
} = pinApi;
