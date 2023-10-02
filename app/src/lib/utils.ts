import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    Object.entries(obj).map(([key, value]) => [key, String(value)])
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

type DebouncedFunction<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(
  func: DebouncedFunction<T>,
  delayMicroseconds: number
) {
  let timerId: ReturnType<typeof setTimeout> | null;
  const delayMilliseconds = delayMicroseconds / 1000;
  return function (...args: T) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delayMilliseconds);
  };
}
