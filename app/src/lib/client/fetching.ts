import {
  type AccountId,
  placeholderImage,
  type Transaction,
  type TransactionQuery,
  transactionsSchema,
} from "../validation/common";
import {
  type Profile,
  profileSchema,
  statsSchema,
  validKeySchema,
} from "../validation/fetching";
import { NEAR_RPC_URL } from "../constants/near";
import { providers } from "near-api-js";
import {
  type AccessKeyView,
  type AccountView,
  type CodeResult,
} from "near-api-js/lib/providers/provider";

function getProvider() {
  return new providers.JsonRpcProvider({
    url: NEAR_RPC_URL,
  });
}

export function encodeArgs(args: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(args)).toString("base64");
}

export async function viewCall<T>(
  contract: string,
  method: string,
  args: Record<string, unknown>,
) {
  const provider = getProvider();

  const result = await provider.query<CodeResult>({
    request_type: "call_function",
    finality: "final",
    account_id: contract,
    method_name: method,
    args_base64: encodeArgs(args),
  });

  return JSON.parse(Buffer.from(result.result).toString()) as T;
}

export async function getKeyInfo(account_id: AccountId, public_key: string) {
  const provider = getProvider();
  try {
    const accessKey = await provider.query<AccessKeyView>({
      request_type: "view_access_key",
      finality: "optimistic",
      account_id,
      public_key,
    });

    return validKeySchema.safeParse(accessKey).success;
  } catch (e) {
    return false;
  }
}

export async function checkIfAccountExists(account_id: string) {
  const provider = getProvider();

  try {
    const view = await provider.query<AccountView>({
      request_type: "view_account",
      finality: "optimistic",
      account_id,
    });
    return view.block_hash !== undefined;
  } catch (e) {
    return false;
  }
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

export function getImageURL(src: string) {
  return `https://ipfs.near.social/ipfs/${src}`;
}

export async function getTransactions(
  query: TransactionQuery = {},
): Promise<Transaction[]> {
  const params: Record<string, string> = {};
  if (query.from) {
    params.from = query.from.toString();
  }
  if (query.limit) {
    params.limit = query.limit.toString();
  }
  if (query.entity_type) {
    params.entity_type = query.entity_type;
  }
  const result = await fetch(
    "/api/transactions/all?" + new URLSearchParams(params).toString(),
  );
  const transactions = transactionsSchema.parseAsync(await result.json());
  return transactions;
}

export async function getStats() {
  const result = await fetch("/api/transactions/stats", { cache: "no-cache" });
  const stats = statsSchema.parseAsync(await result.json());

  return stats;
}
