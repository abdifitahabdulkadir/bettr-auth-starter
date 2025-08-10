import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  provider: "Google" | "Github";
  signUp: Boolean;
}
export default function SignInWithOauthButton({ signUp, provider }: Props) {
  const [isPending, setIsPending] = useState(false);
  const text = signUp ? "Sign Up" : "Sign In";
  const providerId = provider;

  async function handlOnClick() {
    await signIn.social({
      provider: providerId.toLowerCase(),
      fetchOptions: {
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onError() {
          toast.error(`OOOh! failed to  ${text}. please try again`);
        },
        onSuccess() {
          toast.success(`Succesfuuly ${text}`);
        },
      },
    });

    setIsPending(false);
  }

  return (
    <Button
      disabled={isPending}
      onClick={handlOnClick}
      className="bg-slate-900 w-full  text-white rounded-[10px]"
    >
      {isPending ? "Processing...." : text + " " + providerId}
    </Button>
  );
}
