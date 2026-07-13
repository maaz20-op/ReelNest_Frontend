import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all posts with limit for feed
    getPosts: builder.query({
      query: (queryParams) => ({
        url: "/posts/videos",
        method: "GET",
        params: queryParams,
      }),
    }),

    //get video posts of specific user for profile page
    getVideoPostsByuserId: builder.query({
      query: (userId) => ({
        url: `/posts/video/${userId}`,
        method: "GET",
      }),
    }),

    getImagePostsByUserId: builder.query({
      query: (userId) => ({
        url: `/posts/image/${userId}`,
        method: "GET",
      }),
    }),

    getSearchResults: builder.query({
      query: (text) => ({
        url: `/posts?text=${text}`,
        method: "GET",
      }),
    }),

    deleteLoggedInUserPost: builder.mutation({
      query: ({ postId, userId, mediaType }) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { postId, userId, mediaType },
        { dispatch, queryFulfilled },
      ) {
        const queryKey =
          mediaType === "video"
            ? "getVideoPostsByuserId"
            : "getImagePostsByUserId";

        const updatePostPatch = dispatch(
          apiSlice.util.updateQueryData(queryKey, userId, (draft) => {
            const postsArray = draft?.data?.[0];

            if (Array.isArray(postsArray)) {
              // 2. Find the index of the post to delete
              const index = postsArray.findIndex(
                (p) => p?._id?.toString() === postId?.toString(),
              );

              // 3. Mutate the array directly so Immer tracks the change
              if (index !== -1) {
                postsArray.splice(index, 1);
              }
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updatePostPatch.undo();
        }
      },
    }),

    // like post
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/like/${postId}`,
        method: "PATCH",
      }),
      async onQueryStarted(
        { postId, userId, loggedInUser },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          apiSlice.util.updateQueryData(
            "getVideoPostsByuserId",
            String(userId),
            (draft) => {
              console.log("this is darft", current(draft));
              const post = draft?.data[0].find(
                (p) => String(p._id) === String(postId),
              );
              if (post && !post.likes.includes(loggedInUser)) {
                console.log("liked push");

                post.likes.push(loggedInUser);
              } else {
                console.log("already liked");
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patch.undo();
        }
      },
    }),

    // create post
    createPost: builder.mutation({
      query: (userData) => ({
        url: "/posts",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useCreatePostMutation,
  useDeleteLoggedInUserPostMutation,
  useGetVideoPostsByuserIdQuery,
  useGetImagePostsByUserIdQuery,
  useLazyGetSearchResultsQuery,
  useLikePostMutation,
} = postApi;
