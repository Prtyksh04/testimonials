  import { NextAuthOptions } from 'next-auth';
  import { PrismaAdapter } from '@next-auth/prisma-adapter';
  import GoogleProvider from "next-auth/providers/google";
  import prisma from '@/db';


  export const AuthOptions: NextAuthOptions = ({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      })
    ],
    pages: {
      signIn: '/auth/signin',
    },
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl + '/dashboard';
      },

      async signIn(params) {
        if (!params.user.email) {
          return false;
        }
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: params.user.email
            }
          })
          if (existingUser) {
            return true;
          }
          await prisma.user.create({
            data: {
              email: params.user.email,
              provider: "Google"
            }
          })
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      async session({ session, token, user }) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: session.user?.email as string
          }
        })
        if (!dbUser) {
          return session;
        }
        return {
          ...session,
          user: {
            ...session.user,
            id: dbUser.id
          }
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
