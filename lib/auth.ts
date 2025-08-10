import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { UserRole } from "./generated/prisma";
import { ac, roles } from "./permissions";
import { prisma } from "./prisma";
import { validDomains } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET_ID!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    },
  },
  emailAndPassword: {
    // better minim password length is 8 so wecan make it 6
    minPasswordLength: 6,
    enabled: true,

    // better auth automaticlly signs in on the registration unless there is
    //email verification is enabled, but we can disable this behaviour
    // authSign field
    // autoSignIn: false,
  },

  // better auth also generates ids for you ,
  // if you dont disbale and generate manually for you self
  advanced: {
    database: {
      generateId: false,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path === "/sign-up/email") {
        const domain = context.body.email.split("@")[1];
        console.log(domain);
        if (!validDomains(domain))
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain, please use valid domain",
          });
      }

      return context;
    }),
  },
  session: {
    // expiration time in seconds, 30 days is 1=24*60*60
    // then mutliply by number of days you want, 30*24*60
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },

  // add other adtions data or fields in your data so the tat will be add
  // to the user object int he session hooks, no need to use and fetch
  // from database or some hacky ways. soo strighup really.
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        // this means, I am not getting role from user form UI or input.
        input: false,
      },
    },
  },
  account: {
    accountLinking: {
      // if you use same gmail. it will crate one user only
      // but mitlple accounts , by default is true, and
      // you can opt-out incase you wnat that .
      enabled: true,
    },
  },
  // nextcokkies() takes care of setting cookies for you when u signup or sing
  // by server actions.
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
      // impersonationSessionDuration: 60 * 60 * 2, // two hours
    }),
  ],
});

// export erro codes from auth
export type ErrorCodes = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
