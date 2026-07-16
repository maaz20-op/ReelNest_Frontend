import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

const pinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSavedVideoPosts: builder.query({
      query: ({ limit, page }) => ({
        url: `/pins/video?limit=${limit}&page=${page}`,
        method: "GET",
      }),
    }),

    getSavedImagePosts: builder.query({
      query: ({ limit, page }) => ({
        url: `/pins/image?limit=${limit}&page=${page}`,
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
      query: ({ postId, mediaType }) => ({
        url: `/pins/${postId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { postId, mediaType, limit, page },
        { dispatch, queryFulfilled },
      ) {
        const queryKey =
          mediaType === "video" ? "getSavedVideoPosts" : "getSavedImagePosts";

        const updateSavedPostsPatch = dispatch(
          apiSlice.util.updateQueryData(queryKey, { limit, page }, (draft) => {
            console.log(current(draft));
            const savedPosts = draft?.data[0];
            if (savedPosts && Array.isArray(savedPosts)) {
              draft.data[0] = savedPosts.filter(
                (post) => post?._id.toString() !== postId.toString(),
              );
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateSavedPostsPatch.undo();
        }
      },
    }),
  }),
});

export const {
  useLazyGetSavedVideoPostsQuery,
  useLazyGetSavedImagePostsQuery,
  useDeleteSavedPostMutation,
  useCreateUserSavedPinsMutation,
} = pinApi;
