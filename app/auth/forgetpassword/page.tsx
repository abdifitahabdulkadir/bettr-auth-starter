import ForgetPassword from "@/components/forms/ForgetPassword";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");

  return (
    <main className="w-full min-h-screen justify-center flex flex-col items-center px-20">
      <div className="w-full bg-slate-900 text-white py-2.5">
        <h4 className="text-3xl font-semibold text-center">Forget Password</h4>
      </div>
      <ForgetPassword token={token} />
    </main>
  );
}
