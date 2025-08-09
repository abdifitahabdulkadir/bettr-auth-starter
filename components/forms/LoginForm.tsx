"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Loginform() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = String(formData.get("email"));
    if (!email) return toast.error("Please provide your Email");
    const password = String(formData.get("password"));
    if (!password) return toast.error("Please provide your password");

    await signIn.email(
      {
        email,
        password,
      },
      {
        onError(ctx) {
          toast.error(ctx.error.message);
        },
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Successfully signed up. welcome back");
          router.push("/profile");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-5 w-full">
      <div className="space-y-2 ">
        <Label htmlFor="email">Enter Your Email Address</Label>
        <Input
          id="email"
          type="email"
          // better auth nees to have name for each input
          name="email"
          placeholder="seaph@gmail.com"
        />
      </div>
      <div className="space-y-2 ">
        <Label htmlFor="password">Enter your Password</Label>
        <Input
          id="password"
          // better auth nees to have name for each input
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "login..." : "Login"}
      </Button>
    </form>
  );
}
