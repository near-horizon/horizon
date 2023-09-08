import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp = 0) {
  return new Date(timestamp / 1000000).toLocaleString("en-US", {});
}

export function formatDate(timestamp: string | number) {
  return new Date(timestamp).toLocaleDateString("en-GB");
}

export function formatBudget(budget: number) {
  return budget.toLocaleString("en-US", {
    notation: "compact",
  });
}

export const accountIdSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/);

export const cidSchema = z.string().min(34).max(59);

export type AccountId = z.infer<typeof accountIdSchema>;

export type CID = z.infer<typeof cidSchema>;

export const permissionSchema = z.enum(["Admin"]);

export type Permission = z.infer<typeof permissionSchema>;

export const applicationSchema = z.union([
  z.string().refine((s) => s === "NotSubmitted"),
  z.object({
    Submitted: z.string(),
  }),
  z.object({
    Rejected: z.string(),
  }),
  z.string().refine((s) => s === "Accepted"),
]);

export type Application = z.infer<typeof applicationSchema>;

export const placeholderImage =
  "https://img.icons8.com/?size=512&id=Dajn8muCcSHe&format=png";

export const imageSchema = z
  .union([
    z.object({
      url: z.string().url(),
    }),
    z.object({
      img: z.string().url(),
    }),
    z.object({
      ipfs_cid: z.string(),
    }),
    z.object({
      nft: z.object({
        contractId: accountIdSchema,
        tokenId: z.string(),
      }),
    }),
  ])
  .optional()
  .default({ img: placeholderImage });

export type Image = z.infer<typeof imageSchema>;

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const transactionSchema = z.object({
  id: z.number(),
  timestamp: z.number(),
  block_hash: z.string(),
  hash: z.string(),
  signer_id: accountIdSchema,
  method_name: z.string(),
  args: z.object({}).passthrough(),
  log: z.string(),
});

export const transactionsSchema = z.array(transactionSchema);

export type Transaction = z.infer<typeof transactionSchema>;

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
    Object.keys(obj).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof obj[key] === "object") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        removeEmpty(obj[key] as object);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (obj[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete obj[key];
      }
    });
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    obj = obj.map((item) => removeEmpty(item));
  }

  return obj;
}
