"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function GetStartedButton() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return <Button className="bg-green-600 text-white">Pending....</Button>;

  const href = session ? "/profile" : "/auth/login";
  return (
    <div className="flex items-center flex-col justify-center gap-4">
      {session && <p className="font-bold italic"> {session.user.name}</p>}
      <Button size={"sm"} asChild>
        <Link href={href}>Let us go</Link>
      </Button>
    </div>
  );
}
