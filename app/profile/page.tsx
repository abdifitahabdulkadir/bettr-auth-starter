import ReturnButton from "@/components/ReturnButton";
import SignOut from "@/components/SignOut";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return <p className="text-destructive text-2xl">Unauthorized User</p>;

  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        <ReturnButton label="Home" href="/" />
        <h2 className="text-3xl font-bold">Welcome to your Proifle</h2>
      </div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

      <SignOut />
    </main>
  );
}
