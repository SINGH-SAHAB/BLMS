import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCategoriesPayload, CreateLevelspayload } from '@/app/components/Admin/Customization/types';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery,
  endpoints: (builder) => ({
    createLayout: builder.mutation<void, CreateCategoriesPayload>({
      query: (payload) => ({
        url: 'create-layout',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

const levelsApi = createApi({
  reducerPath: 'levelsApi',
  baseQuery,
  endpoints: (builder) => ({
    createLayout1: builder.mutation<void, CreateLevelspayload>({
      query: (payload) => ({
        url: 'create-layout1',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useCreateLayoutMutation: useCreateCategoriesMutation } = categoriesApi;
export const { useCreateLayout1Mutation: useCreateLevelsMutation } = levelsApi;
