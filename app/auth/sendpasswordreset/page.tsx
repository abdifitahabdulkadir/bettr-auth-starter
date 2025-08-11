import SendPasswordReset from "@/components/forms/SendResetPasswordForm";

export default function page() {
  return (
    <div className="w-full justify-center flex-col min-h-screen bg-slate-200 flex items-center">
      <h2 className="font-bold text-black text-3xl">Sending Password Reset</h2>
      <SendPasswordReset />
    </div>
  );
}
