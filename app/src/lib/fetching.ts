import { useQuery } from "@tanstack/react-query";
import {
  type AccountId,
  transactionsSchema,
  type Transaction,
  placeholderImage,
} from "./validation/common";
import {
  type Profile,
  profileSchema,
  statsSchema,
  validKeySchema,
} from "./validation/fetching";

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
  } satisfies Profile;
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
