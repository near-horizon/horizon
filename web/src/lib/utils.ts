import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapImage(src: string) {
  return `https://ipfs.near.social/ipfs/${src}`;
}
