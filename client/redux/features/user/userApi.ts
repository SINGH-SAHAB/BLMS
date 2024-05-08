import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateBgpicture: builder.mutation({
      query: (bgPicture) => ({
        url: "update-user-bgPicture",
        method: "PUT",
        body: { bgPicture },
        credentials: "include" as const,
      }),
    }),
    updateAbout: builder.mutation({
      query: ({userId, about}) => ({
        url: "update-user-About",
        method: "PUT",
        body: {
          userId,
           about },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserInformation: builder.query({
      query: (userID) => ({
        url: "getInfo",
        method: "POST",
        body:{
          userID
        },
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),

    updateUserRoleById: builder.mutation({
      query: ({ userId, role }) => ({
        url: "update-user-byID",
        method: "PUT",
        body: { userId, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateBgpictureMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUserInformationQuery,
  useUpdateUserRoleByIdMutation,
  useUpdateAboutMutation,
} = userApi;
