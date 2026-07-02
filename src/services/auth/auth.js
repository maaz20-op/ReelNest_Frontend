import { apiSlice } from "../baseApi";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthMe: builder.query({
      query: () => "/auth/local/me",
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

export const { useGetAuthMeQuery, useSignupUserMutation } = authApi;
