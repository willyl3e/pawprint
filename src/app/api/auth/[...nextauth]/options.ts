import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    role?: string | null;
    pfp?: string | null
  }

  interface Session {
    user: {
      id: string;
      username: string;
      name?: string | null;
      pfp?: string | null;
      role?: string | null; // Add 'role' to session
    };
  }

  interface JWT {
    id: string;
    username: string;
    role?: string | null; 
    pfp?: string | null; 
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db("pawprint");
          const collection = db.collection("credentials");

          const user = await collection.findOne({
            username: credentials.username,
          });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            // If the user is found and password is correct, return user data
            return { id: user._id.toString(), username: user.username, name: user.name, pfp: user.pfp, role: user.role};
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // The jwt callback is triggered when a session is created or a JWT is updated
    async jwt({ token, user }) {
      if (user) {
        // Store user data in the JWT token
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.pfp = user.pfp;
        token.role = user.role
      }
      return token;
    },

    // The session callback is triggered when a session is created or updated
    async session({ session, token }) {
      // Attach user data from the JWT token to the session
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.pfp = token.pfp as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages:{
    signIn:'/authentication/signin'
  }
};

