import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://neuron-pavilion-reappoint.ngrok-free.dev/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Following", "User"],
});
