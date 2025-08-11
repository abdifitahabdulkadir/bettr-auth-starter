import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "./auth";
import { ac, roles } from "./permissions";

export const {
  signUp,
  signOut,
  signIn,
  useSession,
  admin,
  sendVerificationEmail,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  // if you hve added some aditional fields to the user object in th session
  // then that will not automatically reflect to user object in the client side.
  // we have to manually tell and do smething to adjust this issue.
  // we do  that by adding so called "inferAdditionalFields" typed with
  // auth object from auth.ts, and then call it as function.
  // and this works only both server and client are same project
  // like tis nextjs or otherwise we had to add manually like we did
  // in the auth.ts-- almost exactly same format.
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // admin functionaliyt in the client side.
    adminClient({
      ac,
      roles,
    }),
  ],
});
