import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  label: string;
  href: string;
}
export default function ReturnButton({ label, href }: Props) {
  return (
    <Button size={"sm"} asChild>
      <Link href={href}>
        <ArrowLeft />
        {label}
      </Link>
    </Button>
  );
}
