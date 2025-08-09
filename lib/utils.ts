import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validDomains(domain: string) {
  const validDomains = ["example.com", "gmail.com", "yahoo.com"];
  if (validDomains.includes(domain)) return true;
  else return false;
}
