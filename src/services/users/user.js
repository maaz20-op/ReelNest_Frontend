import { apiSlice } from "../baseApi";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowers: builder.query({
      query: () => "/users/followers",
      providesTags: ["Following"],
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
        invalidatesTags: ["Following"],
      }),
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetUserByIdQuery,
  useFollowUserMutation,
} = userApi;
