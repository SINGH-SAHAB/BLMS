// redux/features/tests/testsApi.ts
import { apiSlice } from "../api/apiSlice";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testApi = apiSlice.injectEndpoints({
  endpoints:(builder) =>({
    crateTestData: builder.query({
      query:({ courseId, videoId, question, options, correctAnswer }) => ({
        url:`create-test`,
        method:"POST",
        body:{ courseId, 
          videoId,
           question, 
           options, 
           correctAnswer 
          },
        credentials: 'include' as const
      })
    }),
  })
  
    });

export const { useCrateTestDataQuery } = testApi;
