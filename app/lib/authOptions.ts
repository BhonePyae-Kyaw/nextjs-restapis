import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodbClient";
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db("next14-mongodb-restapis") as any;

        const user = await db.collection("users").findOne({
          email: credentials?.email,
        });

        const bcrypt = require("bcrypt");
        const isValid = await bcrypt.compare(
          credentials?.password,
          user?.password
        );

        if (isValid) {
          return {
            id: user?._id,
            email: user?.email,
            username: user?.username,
          };
        }

        return null;
      },
    }),
  ],
};
