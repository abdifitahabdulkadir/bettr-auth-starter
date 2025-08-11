"use client";

import { sendVerificationEmail } from "@/lib/auth-client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EmailVerficationForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const email = formdata.get("email");

    await sendVerificationEmail({
      email: String(email),
      callbackURL: "/",

      fetchOptions: {
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Succesfully verifed your email");
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
        {isPending ? "Resending..." : "Resend Email Verification"}
      </Button>
    </form>
  );
}
