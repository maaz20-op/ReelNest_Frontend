import { apiSlice } from "../baseApi";

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
      query: (followedUserId) => ({
        url: "/users/follow",
        method: "PATCH",

        body: {
          id: followedUserId,
        },
      }),

      async onQueryStarted(followedUserId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getFollowers", undefined, (draft) => {
            console.log(current(draft));
          }),
        );
      },
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetUserByIdQuery,
  useFollowUserMutation,
} = userApi;
