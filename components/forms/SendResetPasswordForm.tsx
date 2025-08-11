"use client";

import { requestPasswordReset } from "@/lib/auth-client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SendPasswordReset() {
  const [isPending, setIsPending] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const email = formdata.get("email");

    await requestPasswordReset({
      email: String(email),
      redirectTo: "/auth/forgetpassword",
      fetchOptions: {
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onSuccess() {
          setSentEmail(true);

          setTimeout(() => {
            setSentEmail(false);
          }, 6000);
          toast.success("Reset Email has been sent to given Email.");
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-full max-w-sm mt-4"
    >
      {sentEmail ? (
        <div className="w-fit px-4 bg-green-400">
          <h3>Reset Emial has been sent successfully</h3>
        </div>
      ) : (
        <>
          <div className="space-y-2 w-full">
            <Label htmlFor="emial">Email Addres</Label>
            <Input
              name="email"
              id="email"
              disabled={isPending}
              placeholder="seaph@gmail.com"
            />
          </div>
          <Button disabled={isPending}>
            {isPending ? "Sending..." : "Send Email Reset"}
          </Button>
        </>
      )}
    </form>
  );
}
