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
  useGetOtpMutation,
  useLogoutUserMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
} = authApi;
