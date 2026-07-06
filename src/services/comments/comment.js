import { Comments } from "../../features/comments/components/Comments";
import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsComments: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
    }),

    createComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: {
          inputText: comment?.text,
          postId: comment?.postId,
        },
      }),

      async onQueryStarted(comment, { dispatch, queryFulfilled }) {
        const postId = comment?.postId;
        const updateCommentsPatch = dispatch(
          apiSlice.util.updateQueryData("getPostsComments", postId, (draft) => {
            const comments = draft?.data[0]?.comments;
            if (!Array.isArray(comments) || !draft) return;

            comments.push(comment);
            console.log(
              "comments pushed in chahched",
              current(draft?.data[0]?.comments),
            );
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateCommentsPatch.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsCommentsQuery, useCreateCommentMutation } =
  commentApi;
