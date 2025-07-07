import baseApi from "@/redux/api/baseApi";

export const destinationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDestination: builder.mutation({
      query: (data) => ({
        url: "/destinations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["destination"],
    }),
    getDestinations: builder.query({
      query: () => ({
        url: "/destinations",
        method: "GET",
      }),
      providesTags: ["destination"],
    }),
  }),
});

export const { useAddDestinationMutation, useGetDestinationsQuery } =
  destinationApi;
