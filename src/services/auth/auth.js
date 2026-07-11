import { apiSlice } from "../baseApi";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthMe: builder.query({
      query: () => "/auth/local/me",
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/local/login",
        method: "POST",
        body: body,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/local/logout",
        method: "POST",
      }),
    }),

    signupUser: builder.mutation({
      query: (body) => ({
        url: "/auth/local/signup",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAuthMeQuery,
  useSignupUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
} = authApi;
