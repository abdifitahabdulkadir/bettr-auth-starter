import ReturnButton from "@/components/ReturnButton";
import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const headerLists = await headers();
  const session = await auth.api.getSession({
    headers: headerLists,
  });

  if (!session)
    return <p className="text-destructive text-2xl">Unauthorized User</p>;

  const { success: hasfullAcess } = await auth.api.userHasPermission({
    headers: headerLists,
    body: {
      userId: session.user.id,
      permission: {
        posts: ["delete", "update"],
      },
    },
  });
  return (
    <main className="px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        {session.user.role === "ADMIN" && (
          <Button asChild size={"lg"} className="mx-3">
            <Link href={"/admin/dashboard"}>Admin Dasboard</Link>
          </Button>
        )}
        <ReturnButton label="Home" href="/" />
        {session.user.image ? (
          <Image
            alt="user profile image"
            src={session.user.image}
            width={40}
            height={40}
          />
        ) : (
          <div className="size-[100px] flex items-center justify-center bg-slate-900 text-white text-2xl rounded-[10px]">
            {session.user.name.substring(0, 2)}
          </div>
        )}
        <h2 className="text-3xl font-bold">Welcome to your Proifle</h2>
        <div className="w-full space-y-4">
          <h3 className="text-3xl font-bold">List of permissoins</h3>
          {hasfullAcess ? (
            <Button>Manage all posts</Button>
          ) : (
            <Button>Manage Your only</Button>
          )}
        </div>
      </div>
      <pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>

      <SignOut />
    </main>
  );
}
