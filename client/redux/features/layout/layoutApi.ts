import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLayout: builder.query({
      query: (type) => ({
        url: `create-layout/${type}`,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  
  
  // endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    
    
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery,useCreateLayoutQuery, useEditLayoutMutation } = layoutApi;
