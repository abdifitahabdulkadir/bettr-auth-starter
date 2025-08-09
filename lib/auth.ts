import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    // better minim password length is 8 so wecan make it 6
    minPasswordLength: 6,
    enabled: true,

    // better auth automaticlly signs in on the registration unless there is
    //email verification is enabled, but we can disable this behaviour
    // authSign field
    autoSignIn: false,
  },

  // better auth also generates ids for you ,
  // if you dont disbale and generate manually for you self
  advanced: {
    database: {
      generateId: false,
    },
  },

  session: {
    // expiration time in seconds, 30 days is 1=24*60*60
    // then mutliply by number of days you want, 30*24*60
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
});
