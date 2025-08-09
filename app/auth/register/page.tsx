import RegisterForm from "@/components/forms/RegisterForm";
import ReturnButton from "@/components/ReturnButton";
import Link from "next/link";

export default function page() {
  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        <ReturnButton label="Home" href="/" />
        <h2 className="text-3xl font-bold">Register Here</h2>
      </div>
      <RegisterForm />
      <p className="text-sm text-foreground">
        Already have an account ?{" "}
        <Link
          className="text-foreground hover:text-muted-foreground"
          href={"/auth/login"}
        >
          Login Here
        </Link>
      </p>
    </main>
  );
}
