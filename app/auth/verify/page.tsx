import EmailVerficationForm from "@/components/forms/EmailVerficationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function AuthVerifyPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="w-full h-screen flex-col flex items-center justify-center">
      <h1 className="text-3xl font-bold">Email Verification</h1>

      {error == "invalid_token" ? (
        <p className="text-destructive mt-3 text-3xl ">
          Your token is Invalid please click the Link provided in the Email
          without changing it.
        </p>
      ) : error == "token_expired" ? (
        <>
          <p className="text-destructive mt-3 text-3xl ">
            Your token has expired please request another verification link
          </p>
          <EmailVerficationForm />
        </>
      ) : (
        <>
          <div className="h-fit w-full bg-green-800 max-w-sm px-5 py-2 rounded-full">
            <h2 className="text-white text-4xl">
              You have sucessfully verified your Email
            </h2>
          </div>
          <Button asChild className="bg-slate-900 rounded-full text-white">
            <Link href={"/"}>Go Home</Link>
          </Button>
        </>
      )}
    </main>
  );
}
