"use client";

import { admin } from "@/lib/auth-client";
import { UserRole } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  role: UserRole;
}
export default function ChangeUserRole({ userId, role }: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function onChangeRole(event: ChangeEvent<HTMLSelectElement>) {
    const newRole = event.target.value;

    const { data } = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });

    if (!data?.success) {
      return toast.error("You are not authorized to change Role.");
    }

    await admin.setRole({
      userId,
      role: newRole as UserRole,
      fetchOptions: {
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
        onError(context) {
          toast.error(context.error.message);
        },
        onSuccess() {
          toast.success("Sucesfully changed user Role to Admin");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      onChange={onChangeRole}
      className="disabled:text-gray-500 disabled:cursor-not-allowed"
      value={role}
      disabled={role === "ADMIN" || isPending}
    >
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
    </select>
  );
}
