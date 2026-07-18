import { apiSlice } from "../baseApi";

const googleAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginWithGoogle: builder.query({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyLoginWithGoogleQuery } = googleAuthApi;
