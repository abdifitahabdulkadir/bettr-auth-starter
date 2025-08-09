"use client";

import { signUpWithEmailPassword } from "@/lib/auth.actions";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegisterForm() {
  // const [isPending, setisPending] = useState(false);

  const [transition, setStartTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const name = String(formData.get("name"));

    if (!name) return toast.error("Please provide your name");
    const email = String(formData.get("email"));
    if (!email) return toast.error("Please provide your Email");
    const password = String(formData.get("password"));
    if (!password) return toast.error("Please provide your password");

    startTransition(async () => {
      const { message, status } = await signUpWithEmailPassword(formData);
      if (status) {
        toast.success("Succesfully signed up, welcome back!");
        router.push("/profile");
        return;
      }
      toast.error(String(message));
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-5 w-full">
      <div className="space-y-2 ">
        <Label htmlFor="name">Enter Your Name</Label>
        <Input
          id="name"
          // better auth nees to have name for each input
          name="name"
          placeholder="Enter your name"
        />
      </div>
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
      <Button disabled={transition} type="submit" className="w-full">
        {transition ? "Registering...." : "Register"}
      </Button>
    </form>
  );
}
