"use client";

import { deleteUser } from "@/lib/user.actions";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
interface Props {
  userId: string;
}
export default function DeleteUser({ userId }: Props) {
  const [deleting, setIsDeleting] = useState(false);

  async function handleOnClick() {
    setIsDeleting(true);
    const result = await deleteUser(userId);
    if (result.error) {
      toast.error("Failed to delete user try again");
    } else toast.success("Sucesfully delete User.");
    setIsDeleting(false);
  }
  return (
    <Button
      onClick={handleOnClick}
      className="bg-red-400 cursor-pointer"
      disabled={deleting}
    >
      {deleting ? "Deleitng" : <Trash />}
    </Button>
  );
}
