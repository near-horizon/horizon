import { type AccountId, imageSchema } from "~/lib/validation/common";
import { pageSize } from "../constants/pagination";
import { intoURLSearchParams } from "../utils";
import {
  contributorSchema,
  type ContributorsQuery,
  type HorizonContributor,
} from "../validation/contributors";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";
import deepEqual from "deep-equal";

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
      "get_vendor",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}

export async function getContributorCompletion(accountId: AccountId) {
  const contributor = await getContributor(accountId);

  const basicData = [
    contributor.image &&
      deepEqual(contributor.image, imageSchema.parse(undefined)),
    contributor.name && contributor.name.length > 0,
    contributor.tagline && contributor.tagline.length > 0,
    contributor.description && contributor.description.length > 0,
    contributor.website && contributor.website.length > 0,
    contributor.linktree && Object.keys(contributor.linktree).length > 0,
    contributor.verticals && Object.keys(contributor.verticals).length > 0,
    contributor.services && contributor.services.length > 0,
    contributor.poc && contributor.poc.length > 0,
    contributor.languages && Object.keys(contributor.languages).length > 0,
  ];
  const portfolioData = [
    contributor.portfolio && contributor.portfolio.length > 0,
  ];
  return {
    basic: basicData.filter(Boolean).length / basicData.length,
    portfolio: portfolioData.filter(Boolean).length / portfolioData.length,
  };
}
