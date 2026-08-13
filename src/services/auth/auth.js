import { current } from "@reduxjs/toolkit";
import { apiSlice } from "../baseApi";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthMe: builder.query({
      query: () => "/auth/local/me",
      providesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/local/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    getOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/local/get-otp",
        method: "POST",
        body: {
          email,
        },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "/auth/local/verify-otp",
        method: "POST",
        body: {
          otp,
        },
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/local/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.success) {
            dispatch(
              apiSlice.util.updateQueryData("getAuthMe", undefined, (draft) => {
                console.log(current(draft));
                draft.data[0] = null;
              }),
            );
          }
        } catch (error) {
          console.log("Logout failed:", error);
        }
      },
    }),

    signupUser: builder.mutation({
      query: (body) => ({
        url: "/auth/local/signup",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAuthMeQuery,
  useSignupUserMutation,
  useGetOtpMutation,
  useLogoutUserMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
} = authApi;
