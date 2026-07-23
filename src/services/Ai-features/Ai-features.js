import { apiSlice } from "../baseApi";

const AiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    genrateImageWithAi: builder.mutation({
      query: (prompt) => ({
        url: "/ai-features/image",
        method: "POST",
        body: { prompt },
      }),
    }),

    deleteAiGeneratedImage: builder.mutation({
      query: (generatedImage) => ({
        url: "/ai-features/image",
        method: "DELETE",
        body: { generatedImage },
      }),
    }),
  }),
});

export const {
  useGenrateImageWithAiMutation,
  useDeleteAiGeneratedImageMutation,
} = AiApi;
