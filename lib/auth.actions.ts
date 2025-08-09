"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { auth, ErrorCodes } from "./auth";

export async function signUpWithEmailPassword(data: FormData) {
  try {
    const email = String(data.get("email"));
    const name = String(data.get("name"));
    const password = String(data.get("password"));
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null, message: "succesfully signed up", status: true };
  } catch (error) {
    if (error instanceof APIError) {
      const errorCode = (error.body?.code as ErrorCodes) || "UNKNOWN";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return {
            message: "Please Enter Another Email or Password",
            status: false,
          };
        default:
          return { message: error.message, status: false };
      }
    }
    return { message: error, status: false };
  }
}

export async function signInWithEmailPassword(data: FormData) {
  try {
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
    return { message: "succesfully signed In.", status: true };
  } catch (error) {
    if (error instanceof APIError) {
      const errorCode = (error.body?.code as ErrorCodes) || "UNKNOWN";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return {
            message: "Please Enter Another Email or Password",
            status: false,
          };
        default:
          return { message: error.message, status: false };
      }
    }
    return { message: error, status: false };
  }
}
