import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env.mjs";
import { fileUploadSchema } from "./validation/fetching";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp = 0) {
  return new Date(timestamp / 1000000).toLocaleString("en-GB", {});
}

export function formatDate(timestamp: string | number) {
  return new Date(timestamp).toLocaleDateString("en-GB");
}

export function formatBudget(budget: number) {
  return budget.toLocaleString("en-US", {
    notation: "compact",
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function intoURLSearchParams(obj: Record<string, unknown>) {
  return new URLSearchParams(makeIntoStrings(obj)).toString();
}

export function makeIntoStrings(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => {
        if (!value) return false;
        if (Array.isArray(value) && !value.length) return false;
        return true;
      })
      .map(([key, value]) => [key, String(value)])
  );
}

export function removeEmpty<T>(obj: T): T | null {
  if (typeof obj === "undefined") return null;

  if (obj === null) return null;

  if (typeof obj === "object") {
    (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
      if (typeof obj[key] === "object") {
        removeEmpty(obj[key]);
      } else if (obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    obj = obj.map((item) => removeEmpty(item));
  }

  return obj;
}

export function ipfsURL(cid: string) {
  return `${env.NEXT_PUBLIC_IPFS_URL}/ipfs/${cid}`;
}

export function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

export async function uploadImage(file?: File) {
  if (!file) return;
  const response = await fetch(`${env.NEXT_PUBLIC_IPFS_URL}/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: file,
  });
  return fileUploadSchema.parse(await response.json()).cid;
}

export async function generateImage(
  prompt = "Stock image for a anonymous founder in a startup in a blockchain ecosystem. In a cartoonish style - not realistic"
) {
  const response = await fetch("/images/generate", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return fileUploadSchema.parse(await response.json()).cid;
}

export function cleanURL(dirtyURL?: string) {
  if (!dirtyURL) return "#";

  return "https://" + dirtyURL.replaceAll(/https?:\/\//g, "");
}

export function constObjectKeysIntoZodEnum<T extends string>(
  obj: Readonly<Record<T, unknown>>
): z.ZodEnum<[T, ...T[]]> {
  const [key, ...keys] = Object.keys(obj) as T[];
  return z.enum([key!, ...keys]);
}
