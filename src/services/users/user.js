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
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    unfollowUser: builder.mutation({
      query: ({ unfollowUserId, userId }) => ({
        url: "/users/unfollow",
        method: "PATCH",
        body: {
          id: unfollowUserId,
        },
      }),

      async onQueryStarted(
        { unfollowUserId, userId },
        { dispatch, queryFulfilled },
      ) {
        const updateUserfollowing = dispatch(
          apiSlice.util.updateQueryData("getAuthMe", undefined, (draft) => {
            const user = draft?.data[0];

            if (user && Array.isArray(user.following)) {
              user.following = user.following.filter(
                (id) => id !== unfollowUserId,
              );
            }
          }),
        );

        const updateUserConnectionData = dispatch(
          apiSlice.util.updateQueryData(
            "getLoggedInUserConnection",
            undefined,
            (draft) => {
              let followingList = draft?.data[1];
              let friends = draft?.data[2];

              if (Array.isArray(followingList) && Array.isArray(friends)) {
                followingList = followingList.filter(
                  (fu) => fu?._id.toString() !== unfollowUserId.toString(),
                );

                friends = friends.filter(
                  (fu) => fu?._id.toString() !== unfollowUserId.toString(),
                );

                draft.data[1] = followingList;
                draft.data[2] = friends;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateUserfollowing.undo();
          updateUserConnectionData.undo();
        }
      },
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
            const user = draft?.data[0];
            const updatedData = Object.fromEntries(formData);
            for (let key in updatedData) {
              user[key] = updatedData[key];
            }
          }),
        );
        const profileUserPatch = dispatch(
          apiSlice.util.updateQueryData("getUserById", userId, (draft) => {
            const user = draft?.data[0];
            const updatedData = Object.fromEntries(formData);
            for (let key in updatedData) {
              user[key] = updatedData[key];
            }
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

    blockOtherUser: builder.mutation({
      query: (user) => ({
        url: "/users/block",
        method: "PATCH",
        body: {
          id: user?._id,
        },
      }),

      async onQueryStarted(user, { dispatch, queryFulfilled }) {
        const updateConnectionPatch = dispatch(
          apiSlice.util.updateQueryData(
            "getLoggedInUserConnection",
            undefined,
            (draft) => {
              const Friends = draft?.data[2];
              const Following = draft?.data[1];
              if (Array.isArray(Friends) && Array.isArray(Following)) {
                draft.data[2] = Friends.filter(
                  (f) => f?._id.toString() !== user?._id.toString(),
                );

                draft.data[1] = Following.filter(
                  (f) => f?._id.toString() !== user?._id.toString(),
                );
              }
            },
          ),
        );
        const updateBlockedUsersList = dispatch(
          apiSlice.util.updateQueryData(
            "getBlockedUsers",
            undefined,
            (draft) => {
              const blockedUsers = draft?.data[0];
              if (blockedUsers && Array.isArray(blockedUsers)) {
                draft?.data[0].push(user);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateBlockedUsersList.undo();
          updateConnectionPatch.undo();
        }
      },
    }),

    getBlockedUsers: builder.query({
      query: () => "/users/block",
    }),

    unblockOtherUser: builder.mutation({
      query: (blockedUserId) => ({
        url: "/users/unblock",
        method: "PATCH",
        body: {
          id: blockedUserId,
        },
      }),
      async onQueryStarted(blockedUserId, { dispatch, queryFulfilled }) {
        const updateBlockedUserList = dispatch(
          apiSlice.util.updateQueryData(
            "getBlockedUsers",
            undefined,
            (draft) => {
              const blockedUsers = draft?.data[0];
              if (blockedUsers && Array.isArray(blockedUsers)) {
                draft.data[0] = blockedUsers.filter(
                  (u) => u?._id.toString() !== blockedUserId.toString(),
                );
              }
            },
          ),
        );
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
  useGetBlockedUsersQuery,
  useUnblockOtherUserMutation,
  useBlockOtherUserMutation,
  useUnfollowUserMutation,
  useDeleteUserAccountMutation,
  useUpdateUserProfileSettingsMutation,
  useFollowUserMutation,
} = userApi;
