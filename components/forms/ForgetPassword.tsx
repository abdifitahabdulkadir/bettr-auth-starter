"use client";

import { resetPassword } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ForgetPassword({
  token,
}: {
  token: string | undefined;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const password = formdata.get("password");
    const repeatPass = formdata.get("password");

    await resetPassword({
      newPassword: String(password),
      token: token,
      fetchOptions: {
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },

        onSuccess() {
          toast.success("Password succesfuuly changed it");
          router.push("auth/login");
        },
        onError(context) {
          toast.error(context.error.message);
        },
      },
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-screen space-y-4 w-full  items-center justify-center mt-4"
    >
      <h3 className="text-2xl text-black border-b pb-[7px] border-black/10">
        Forget Your password, please put Your new Password
      </h3>
      <div className="space-y-2 w-full max-w-sm">
        <Label htmlFor="newPass">New Password</Label>
        <Input
          name="password"
          id="newPass"
          disabled={isPending}
          placeholder=""
        />
      </div>
      <div className="space-y-2 w-full max-w-sm">
        <Label htmlFor="repeatPass">Repeat Password</Label>
        <Input
          name="repeatPass"
          id="repeatPass"
          disabled={isPending}
          placeholder=""
        />
      </div>
      <Button disabled={isPending}>
        {isPending ? "Resending..." : "Update Your Password"}
      </Button>
    </form>
  );
}
