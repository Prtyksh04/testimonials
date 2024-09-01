import NextAuth from "next-auth/next";
import { AuthOptions } from "./options";

const handler = NextAuth(AuthOptions);

export {handler as GET , handler as POST}