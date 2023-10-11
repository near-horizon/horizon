import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "./constants/pagination";
import { intoURLSearchParams } from "./utils";
import {
  type ContributorsQuery,
  contributorSchema,
  type HorizonContributor,
} from "./validation/contributors";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";

export async function getContributors(query: ContributorsQuery) {
  const result = await fetch("/api/contributors?" + intoURLSearchParams(query));
  const contributors = (await result.json()) as string[];
  return contributors;
}

export async function getPaginatedContributors(pageParam = 0) {
  const result = await fetch(
    `/api/contributors?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const contributors = (await result.json()) as string[];

  return {
    items: contributors,
    next: pageParam + 1,
  };
}

export async function getContributor(accountId: AccountId) {
  const response = await fetch("/api/contributors/" + accountId);

  return contributorSchema.parse(await response.json());
}

export async function hasContributor(accountId: AccountId) {
  try {
    await viewCall<HorizonContributor>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_contributor",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}
