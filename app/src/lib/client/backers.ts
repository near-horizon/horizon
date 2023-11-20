import { intoURLSearchParams } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "../constants/pagination";
import {
  backerSchema,
  type BackersQuery,
  type HorizonBacker,
} from "../validation/backers";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";

export async function getBackers(query: BackersQuery) {
  const result = await fetch("/api/backers?" + intoURLSearchParams(query));
  const backers = (await result.json()) as string[];
  return backers;
}

export async function getPaginatedBackers(pageParam = 0) {
  const result = await fetch(
    `/api/backers?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const backers = (await result.json()) as string[];

  return {
    items: backers,
    next: pageParam + 1,
  };
}

export async function getBacker(accountId: AccountId) {
  const response = await fetch("/api/backers/" + accountId);

  return backerSchema.parse(await response.json());
}

export async function hasBacker(accountId: AccountId) {
  try {
    await viewCall<HorizonBacker>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_investor",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}
