import baseApi from "@/redux/api/baseApi";

const terminalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerminals: builder.query({
      query: () => ({
        url: "/terminals",
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    getSingleTerminalById: builder.query({
      query: (id: string) => ({
        url: `/terminals/${id}`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    getAllReviewsbyTerminalId: builder.query({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
  
    updateTerminal: builder.mutation({
      query: ({ updatedTerminal, id }) => ({
        url: `/terminals/${id}`,
        method: "PUT",
        body: updatedTerminal,
      }),
      invalidatesTags: ["Terminal"],
    }),
  }),
});

export const {
  useGetTerminalsQuery,
  useGetSingleTerminalByIdQuery,
  useGetAllReviewsbyTerminalIdQuery,
  useUpdateTerminalMutation,
} = terminalApi;
