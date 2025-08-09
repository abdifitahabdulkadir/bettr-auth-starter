import { createAuthClient } from "better-auth/react";
export const { signUp, signOut, signIn, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
