import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserConnectionsById: builder.query({
      query: (userId) => ({
        url: `/users/connection/${userId}`,
        method: "GET",
      }),
    }),

    getLoggedInUserConnection: builder.query({
      query: () => ({
        url: "/users/connection",
        method: "GET",
      }),
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    deleteUserAccount: builder.mutation({
      query: () => ({
        url: "/users",
        method: "DELETE",
      }),
    }),

    updateUserProfileSettings: builder.mutation({
      query: ({ formData, userId }) => ({
        url: "/users/update",
        method: "PATCH",
        body: Object.fromEntries(formData),
      }),

      async onQueryStarted({ formData, userId }, { dispatch, queryFulfilled }) {
        const authUserPatch = dispatch(
          apiSlice.util.updateQueryData("getAuthMe", undefined, (draft) => {
            console.log("DSKADIOADIA");
            const user = draft?.data[0];
            const updatedData = Object.fromEntries(formData);
            for (let key in updatedData) {
              console.log("keys", key, updatedData[key]);
              user[key] = updatedData[key];
            }
          }),
        );
        const profileUserPatch = dispatch(
          apiSlice.util.updateQueryData("getUserById", userId, (draft) => {
            const user = draft?.data[0];
            const updatedData = Object.fromEntries(formData);
            for (let key in updatedData) {
              console.log("keys", key, updatedData[key]);
              user[key] = updatedData[key];
            }
            console.log(user?.fullname);
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          authUserPatch.undo();
          profileUserPatch.undo();
        }
      },
    }),

    updateAvatar: builder.mutation({
      query: ({ formData, userId }) => ({
        url: "/users/profile-pic",
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      async onQueryStarted({ formData, userId }, { dispatch, queryFulfilled }) {
        try {
          // 1. Wait for the server to finish uploading the file
          const { data: serverResponse } = await queryFulfilled;

          const newImagePath = serverResponse?.data[0];

          if (newImagePath) {
            // 3. Safely update the getAuthMe cache using the clean text string URL

            dispatch(
              apiSlice.util.updateQueryData("getAuthMe", undefined, (draft) => {
                const user = draft?.data[0];
                console.log(serverResponse);
                if (user) {
                  user.profileImage = newImagePath;
                }
              }),
            );

            dispatch(
              apiSlice.util.updateQueryData("getUserById", userId, (draft) => {
                const user = draft?.data[0];
                console.log(current(draft));
                if (user) {
                  user.profileImage = newImagePath;
                }
              }),
            );
          }
        } catch (err) {
          console.error("Upload failed, cache not updated:", err);
        }
      },
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
          apiSlice.util.updateQueryData(
            "getLoggedInUserConnection",
            undefined,
            (draft) => {
              console.log("this is draft", current(draft?.data[1]));
              const followingArray = draft?.data[1];
              const isAlreadyFollowed = followingArray.find(
                (f) => f?._id === followedUser?._id,
              );

              if (Array.isArray(followingArray) && !isAlreadyFollowed) {
                followingArray.push(followedUser);
                return;
              }
            },
          ),
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
          updateUserPatch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUserConnectionsByIdQuery,
  useGetUserByIdQuery,
  useGetLoggedInUserConnectionQuery,
  useUpdateAvatarMutation,
  useDeleteUserAccountMutation,
  useUpdateUserProfileSettingsMutation,
  useFollowUserMutation,
} = userApi;
