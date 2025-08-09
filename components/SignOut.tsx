"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function SignOut() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function handleOnClick() {
    await signOut({
      fetchOptions: {
        onError(context) {
          toast.error(context.error.message);
        },
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Successfully signed out");
          router.push("/auth/login");
        },
      },
    });
  }
  return (
    <Button
      className="bg-red-500 text-white"
      disabled={isPending}
      onClick={handleOnClick}
    >
      {isPending ? "Loading...." : "SignOut"}
    </Button>
  );
}
