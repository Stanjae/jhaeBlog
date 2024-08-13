import NextAuth, {type DefaultSession} from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "./app/lib/zod"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "@neondatabase/serverless"
import { compareHashPassword , getUserById, getUserEmailFromDb } from "./app/lib/userActions"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
   interface User {
   }
   interface Credentials {
    email: string
    password: string
  }

  interface CredentialsConfig {
    authorize: (credentials: Credentials | null) => Promise<User | null>
  }
  interface Session {
    user: {
      /** The user's postal address. */
      role: string
      userid:string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}
 
 
export const { auth, handlers, signIn, signOut } = NextAuth(()=>{
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL })
  return {
  ...authConfig,
  adapter: PostgresAdapter(pool),
  callbacks:{
    async jwt({ token }) {
        if(token.sub){
          const user = await getUserById(token.sub)
          if(!user) return token
          token.userid = user.userid
          token.role = user.role
        }
        //console.log('token:',token);
      return token
    },
    async session({ session, token }) {
      if(session.user && token.sub){
        session.user.id = token.sub as string;
        session.user.userid = token.userid as string;
        session.user.role = token.role as string;
        
      }
      
      //console.log('session:',session);
      return session
    },},
  providers: [GitHub({
    clientId:process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET
  }), 
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET
  }),

  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {label:"email"},
      password: {label:"password"},
    },
    authorize: async (credentials:Partial<Record<"email" | "password", unknown>>) => {
      try {
        let user = null

        const { email, password } = await signInSchema.parseAsync(credentials)


        console.log('credentials',credentials);

        // logic to verify if user exists
        user = await getUserEmailFromDb(email)

        if (!user) {
          throw new Error("User not found.")
        }

        const passwordsMatch = await compareHashPassword(password, user.password)

        if(!passwordsMatch){
          throw new Error("Password does not match")
        }
        
        // return json object with the user data
        //throw new Error("User not found.")
        return user
      } catch (error) {
        if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid
          throw new Error("User not found.")
        }
        throw new Error(JSON.stringify(error))
      }
    },

  }),
  
],
  }
})