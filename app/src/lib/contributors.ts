import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "./constants/pagination";
import { intoURLSearchParams } from "./utils";
import {
  type ContributorsQuery,
  contributorSchema,
} from "./validation/contributors";

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

export function useContributors(query: ContributorsQuery) {
  return useQuery({
    queryKey: ["contributors", query],
    queryFn: () => getContributors(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedContributors() {
  return useInfiniteQuery({
    queryKey: ["contributors-paginated"],
    queryFn: ({ pageParam }) => getPaginatedContributors(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export async function getContributor(accountId: AccountId) {
  const response = await fetch("/api/contributors/" + accountId);

  return contributorSchema.parse(await response.json());
}

export function useContributor(accountId: AccountId) {
  return useQuery({
    queryKey: ["contributor", accountId],
    queryFn: () => getContributor(accountId),
    enabled: !!accountId,
  });
}
