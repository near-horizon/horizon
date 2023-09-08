import { useQuery } from "@tanstack/react-query";
import {
  imageSchema,
  type AccountId,
  transactionsSchema,
  type Transaction,
  placeholderImage,
} from "./validation/common";
import { z } from "zod";
import { env } from "~/env.mjs";

const NEAR_RPC_URL = "https://rpc.mainnet.near.org";

export function encodeArgs(args: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(args)).toString("base64");
}

export async function viewCall<T>(
  contract: string,
  method: string,
  args: Record<string, unknown>
) {
  const response = await fetch(NEAR_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: contract,
        method_name: method,
        args_base64: encodeArgs(args),
      },
    }),
  });

  const s = (await response.json()) as {
    result: { result: Uint8Array };
  };

  if ("error" in s.result) {
    throw new Error(
      `${s.result.error as string}: ${method} ${JSON.stringify(args)}`
    );
  }

  const bytes = s.result.result;

  return JSON.parse(Buffer.from(bytes).toString()) as T;
}

const socialsSchema = z.enum([
  "github",
  "twitter",
  "discord",
  "linkedin",
  "youtube",
  "reddit",
  "website",
  "telegram",
]);

const linktreeSchema = z.record(socialsSchema, z.string());

export type Linktree = z.infer<typeof linktreeSchema>;

export const profileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    image: imageSchema,
    website: z.string(),
    tagline: z.string(),
    linktree: linktreeSchema,
    vertical: z.record(z.string(), z.string()),
    stage: z.string(),
    userbase: z.string(),
    credits: z.boolean(),
    distribution: z.string(),
    dev: z.string(),
    product_type: z.record(z.string(), z.string()),
    team: z.string(),
    tags: z.record(z.string(), z.string()),
  })
  .partial()
  .passthrough();

export type Profile = z.infer<typeof profileSchema>;

const validKeySchema = z.object({
  result: z.object({
    permission: z.object({
      FunctionCall: z.object({
        receiver_id: z
          .string()
          .refine((value) => value === env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID),
      }),
    }),
  }),
});

export const sortSchema = z.enum([
  "timeasc",
  "timedesc",
  "nameasc",
  "namedesc",
  "recentasc",
  "recentdesc",
]);

export const paginationSchema = z.object({
  from: z.number().optional(),
  limit: z.number().optional(),
});

export const paginationURLSchema = z.object({
  from: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
});

export const fetchManySchema = paginationSchema.extend({
  sort: sortSchema.optional(),
  search: z.string().optional(),
});

export const fetchManyURLSchema = paginationURLSchema.extend({
  sort: sortSchema.optional(),
  search: z.string().optional(),
});

export async function getKeyInfo(account_id: AccountId, public_key: string) {
  const response = await fetch(NEAR_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_access_key",
        finality: "final",
        account_id,
        public_key,
      },
    }),
  });

  return validKeySchema.safeParse(await response.json()).success;
}

export async function getProfile(accountId: AccountId) {
  const response = await viewCall<
    Record<string, { profile: Record<string, unknown> }>
  >("social.near", "get", {
    keys: [`${accountId}/profile/**`],
  });

  if (accountId in response) {
    return profileSchema.parse(response[accountId]?.profile);
  }

  return {
    name: "",
    description: "",
    image: { url: placeholderImage },
    website: "",
    tagline: "",
    linktree: {},
    vertical: {},
    stage: "",
    userbase: "",
    credits: false,
    distribution: "",
    dev: "",
    product_type: {},
    team: "",
  } satisfies z.infer<typeof profileSchema>;
}

export function useProfile(accountId: string, enabled = true) {
  return useQuery({
    queryKey: ["social-profile", accountId],
    queryFn: () => getProfile(accountId),
    enabled,
  });
}

export function getImageURL(src: string) {
  return `https://ipfs.near.social/ipfs/${src}`;
}

export async function getTransactions(): Promise<Transaction[]> {
  const result = await fetch("/api/transactions/all");
  const transactions = transactionsSchema.parseAsync(await result.json());
  return transactions;
}

export const statsSchema = z
  .object({
    projects: z.number(),
    vendors: z.number(),
    backers: z.number(),
    requests: z.number(),
    proposals: z.number(),
    contributions: z.number(),
  })
  .transform((value) => ({
    ...value,
    contributors: value.vendors,
  }));

export type Stats = z.infer<typeof statsSchema>;

export async function getStats() {
  const result = await fetch("/api/transactions/stats");
  const stats = statsSchema.parseAsync(await result.json());

  return stats;
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}
