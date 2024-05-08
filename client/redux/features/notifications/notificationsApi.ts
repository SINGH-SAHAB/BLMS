import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: "update-notifications",
        method: "PUT",
        body: {id},
        credentials: "include" as const,
      }),
    }),
    verificationNotification: builder.mutation({
      query: (data) => ({
        url: "/teacher-verification-notification",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
  useVerificationNotificationMutation,
} = notificationsApi;
