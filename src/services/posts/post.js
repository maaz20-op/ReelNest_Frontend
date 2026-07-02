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

    //get posts of specific user for profile page
    getPostsByuserId: builder.query({
      query: (userId) => ({
        url: `/posts/${userId}`,
        method: "GET",
      }),
    }),

    // like post
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/like/${postId}`,
        method: "PATCH",
      }),

      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        console.log("query statee");
        const patch = dispatch(
          apiSlice.util.updateQueryData(
            "getPostsByuserId",
            String(userId),
            (draft) => {
              console.log("this is darft", current(draft));
              const post = draft?.data[0].find(
                (p) => String(p._id) === String(postId),
              );
              if (post && !post.likes.includes(userId)) {
                console.log("liked push");

                post.likes.push(userId);
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
  useGetPostsByuserIdQuery,
  useLikePostMutation,
} = postApi;
