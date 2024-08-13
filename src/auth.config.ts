import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
   },
  callbacks: {
    authorized({ auth}) {
      const isLoggedIn = !!auth?.user;
      
      return isLoggedIn;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;