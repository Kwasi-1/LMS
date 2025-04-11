import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
