import { Comments } from "../../features/comments/components/Comments";
import { apiSlice } from "../baseApi";
import { current } from "@reduxjs/toolkit";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsComments: builder.query({
      query: ({ postId, limit, page }) =>
        `/comments?postId=${postId}&limit=${limit}&page=${page}`,
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: "/comments",
        method: "DELETE",
        body: { postId, commentId },
      }),

      async onQueryStarted(
        { postId, page, limit, commentId },
        { dispatch, queryFulfilled },
      ) {
        const updateCommentsPatch = dispatch(
          apiSlice.util.updateQueryData(
            "getPostsComments",
            {
              postId,
              page,
              limit,
            },
            (draft) => {
              const comments = draft?.data[0];

              if (comments && Array.isArray(comments)) {
                draft.data[0] = comments.filter(
                  (comment) =>
                    comment?._id?.toString() !== commentId.toString(),
                );
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          updateCommentsPatch.undo();
        }
      },
    }),

    createComment: builder.mutation({
      query: ({ comment }) => ({
        url: "/comments",
        method: "POST",
        body: {
          inputText: comment?.text,
          postId: comment?.postId,
        },
      }),

      async onQueryStarted(
        { comment, limit, page },
        { dispatch, queryFulfilled },
      ) {
        const postId = comment?.postId;
        const updateCommentsPatch = dispatch(
          apiSlice.util.updateQueryData(
            "getPostsComments",
            { postId, limit, page },
            (draft) => {
              const comments = draft?.data[0];
              if (!Array.isArray(comments) || !draft) return;

              comments.push(comment);
            },
          ),
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

export const {
  useLazyGetPostsCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
