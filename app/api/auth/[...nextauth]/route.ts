import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismasingleton";

const handler = NextAuth({
  // Configure providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "default_client_id",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "default_client_secret",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing username or password");
          }

          // Find the user in the database
          const user = await prisma.user.findFirst({
            where: { email: credentials.username },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Password validation (replace with hashing like bcrypt for production)
          const isPasswordValid = credentials.password === user.password;

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return the user object
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (err) {
          console.error(err);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        console.log(profile)

        if (existingUser) {
          console.log("Found existing user");
          return true;
        }

        await prisma.user.create({
          data: {
            name: profile.name || "Unknown",
            email: profile.email,
            profilepic: (profile?.picture) || null,
          },
        });

        console.log("Created new user");
      }

      return true;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "default_secret",

  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
