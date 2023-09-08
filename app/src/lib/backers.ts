import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { intoURLSearchParams } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "./constants/pagination";
import { backerSchema, type BackersQuery } from "./validation/backers";

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

export function useBackers(query: BackersQuery) {
  return useQuery({
    queryKey: ["backers", query],
    queryFn: () => getBackers(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedBackers() {
  return useInfiniteQuery({
    queryKey: ["backers-paginated"],
    queryFn: ({ pageParam }) => getPaginatedBackers(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export async function getBacker(accountId: AccountId) {
  const response = await fetch("/api/backers/" + accountId);

  return backerSchema.parse(await response.json());
}

export function useBacker(accountId: AccountId) {
  return useQuery({
    queryKey: ["backer", accountId],
    queryFn: () => getBacker(accountId),
    enabled: !!accountId,
  });
}
