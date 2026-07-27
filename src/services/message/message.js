import { apiSlice } from "../baseApi";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ chatedUserId, limit, page }) => ({
        url: `/messages?chatedUserId=${chatedUserId}&&limit=${limit}&&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetMessagesQuery } = messageApi;
