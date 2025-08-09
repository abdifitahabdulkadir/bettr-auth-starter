import Loginform from "@/components/forms/LoginForm";

export default function page() {
  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Login Here</h2>
      </div>
      <Loginform />
    </main>
  );
}
