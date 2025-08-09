import ReturnButton from "@/components/ReturnButton";
import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return <p className="text-destructive text-2xl">Unauthorized User</p>;

  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        {session.user.role === "ADMIN" && (
          <Button asChild size={"lg"} className="mx-3">
            <Link href={"/admin/dashboard"}>Admin Dasboard</Link>
          </Button>
        )}
        <ReturnButton label="Home" href="/" />
        <h2 className="text-3xl font-bold">Welcome to your Proifle</h2>
      </div>
      <pre className="text-sm ">{JSON.stringify(session, null, 2)}</pre>

      <SignOut />
    </main>
  );
}
