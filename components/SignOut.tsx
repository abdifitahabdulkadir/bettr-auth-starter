"use client";

import { signOut } from "@/lib/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function SignOut() {
  const [transition, startTranstion] = useTransition();
  function handleOnClick() {
    startTranstion(async () => {
      await signOut({
        fetchOptions: {
          onError(context) {
            toast.error(context.error.message);
          },
          onSuccess() {
            toast.success("Successfully signed out");
          },
        },
      });
    });
  }
  return (
    <Button
      className="bg-red-500 text-white"
      disabled={transition}
      onClick={handleOnClick}
    >
      {transition ? "Loading...." : "SignOut"}
    </Button>
  );
}
