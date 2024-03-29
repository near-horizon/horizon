import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env.mjs";
import { fileUploadSchema } from "./validation/fetching";
import { DATE, NUMBER } from "./format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFileURL(
  value: string,
): string | { url: string; filename: string; size: string; uploaded: string } {
  if (value.includes(",")) {
    const [cid, filename, size, uploaded] = value.split(",");
    return {
      url: ipfsURL(cid!),
      filename: filename!,
      size: NUMBER.bytes(size!),
      uploaded: DATE.time(uploaded),
    };
  }
  return value;
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
      .map(([key, value]) => [key, String(value)]),
  );
}

export function removeNulls<T>(obj: T): T | null {
  if (typeof obj === "undefined") return null;

  if (obj === null) return null;

  if (typeof obj === "object") {
    (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        removeNulls(obj[key]);
      } else if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    obj = obj.map((item) => removeNulls(item));
  }

  return obj;
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
    buffer.byteOffset + buffer.byteLength,
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
  prompt = "Stock image for a anonymous founder in a startup in a blockchain ecosystem. In a cartoonish style - not realistic",
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
