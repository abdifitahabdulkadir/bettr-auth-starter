"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./prisma";

export async function deleteUser(userid: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("UNAUTHORIZED USER");

  try {
    await prisma.user.delete({
      where: {
        id: userid,
      },
    });
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
    return { error: null };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      return { error };
    }
    return { error: "Unknow Error, something went wrong!!" };
  }
}
