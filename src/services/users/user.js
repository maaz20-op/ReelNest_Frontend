import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowers: builder.query({
      query: () => "/users/followers",
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    followUser: builder.mutation({
      query: (followedUser) => ({
        url: "/users/follow",
        method: "PATCH",
        body: {
          id: followedUser?._id,
        },
      }),

      async onQueryStarted(followedUser, { dispatch, queryFulfilled }) {
        const updateFollowingList = dispatch(
          apiSlice.util.updateQueryData("getFollowers", undefined, (draft) => {
            console.log("this is draft", current(draft?.data[1]));
            const followingArray = draft?.data[1];
            const isAlreadyFollowed = followingArray.find(
              (f) => f?._id === followedUser?._id,
            );

            if (Array.isArray(followingArray) && !isAlreadyFollowed) {
              followingArray.push(followedUser);
              return;
            }
          }),
        );

        const updateUserPatch = dispatch(
          apiSlice.util.updateQueryData("getAuthMe", undefined, (draft) => {
            console.log("user draft", current(draft));
            if (!draft || !draft?.data[0]?._id) return;

            const loggedInUser = draft?.data[0];
            const followingArray = loggedInUser?.following;

            if (followingArray && Array.isArray(followingArray)) {
              followingArray.push(followedUser?._id);
              return;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateFollowingList.undo();
          updateUserPatch.patch();
        }
      },
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetUserByIdQuery,
  useFollowUserMutation,
} = userApi;
