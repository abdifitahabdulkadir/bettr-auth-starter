import Loginform from "@/components/forms/LoginForm";
import ReturnButton from "@/components/ReturnButton";
import Link from "next/link";

export default function page() {
  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        <ReturnButton label="Home" href="/" />
        <h2 className="text-3xl font-bold">Login Here</h2>
      </div>
      <Loginform />
      <p className="text-sm text-foreground">
        Dont have any account ?{" "}
        <Link
          className="text-foreground hover:text-muted-foreground"
          href={"/auth/register"}
        >
          Register Here
        </Link>
      </p>
    </main>
  );
}
