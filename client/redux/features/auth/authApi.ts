import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),


      
        resetPass: builder.mutation<RegistrationResponse, RegistrationData>({
          query: (data) => ({
            url: "reset-pass",
            method: "POST",
            body: data,
            credentials: "include" as const,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
              console.log();
              dispatch(
                userRegistration({
                  token: result.data.activationToken,
                })
              );
            } catch (error: any) {
              console.log(error);
            }
          },
        }),
    

        resendCode: builder.mutation<RegistrationResponse, RegistrationData>({
          query: (data) => ({
            url: "resend-activation",
            method: "POST",
            body: data,
            credentials: "include" as const,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
              console.log();
              dispatch(
                userRegistration({
                  token: result.data.activationToken,
                })
              );
            } catch (error: any) {
              console.log(error);
            }
          },
        }),
    

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    newpass: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "new-pass",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    newPassword: builder.mutation({
      query: ({ activation_token, newPassword }) => ({
        url: "update-new-password",
        method: "PUT",
        body: {
          activation_token,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),


    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

   
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            userLoggedOut()
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),


//     auth: builder.mutation({
//       query: ({ email}) => ({
//         url: "auth",
//         method: "POST",
//         body: {
//           email,
//         },
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userLoggedIn({
//               accessToken: result.data.accessToken,
//               user: result.data.user,
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       },
//     }),
   }),
   });

export const {
  useRegisterMutation,
  useResetPassMutation,
  useResendCodeMutation,
  useNewpassMutation,
  useNewPasswordMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery
} = authApi;
