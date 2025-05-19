import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

// Extend the Session type to include id on user
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

// Create a promise for the database connection
const clientPromise = connectToDatabase().then(db => db.client);

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}
