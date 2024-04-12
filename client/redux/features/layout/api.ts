// api.ts
import { CreateCategoriesPayload } from '@/app/components/Admin/Customization/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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

export const { useCreateLayoutMutation } = api;