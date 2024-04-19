import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
console.log(process.env.GOOGLE_CLIENT_ID,'red');
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID || '',
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        // })
    ],

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },


    // callbacks: {
    //    async signIn({ user, account, profile, email, credentials }) {
    //      return true
    //    },
    //    async redirect({ url, baseUrl }) {
    //      return baseUrl
    //    },
    //    async session({ session, user, token }) {
    //      return session
    //    },
    //    async jwt({ token, user, account, profile, isNewUser }) {
    //      return token
    //    }
 // secret: process.env.SECRET,
}

export default NextAuth(authOptions);