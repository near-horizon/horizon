import { env } from "~/env.mjs";
import { viewCall } from "./fetching";
import { type AccountId, type CID } from "./validation/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { pageSize } from "./constants/pagination";
import { intoURLSearchParams } from "./utils";
import { requestSchema, type RequestsQuery } from "./validation/requests";

export async function getRequests(
  query: RequestsQuery
): Promise<[string, string][]> {
  const response = await fetch("/api/requests?" + intoURLSearchParams(query));
  const requests = (await response.json()) as [string, string][];
  return requests;
}

function requestsInitialData() {
  const initialData: [string, string][] = new Array<[string, string]>(3).fill([
    "",
    "",
  ]);

  return initialData;
}

export function useRequests(query: RequestsQuery) {
  return useQuery({
    queryKey: ["requests", query],
    queryFn: () => getRequests(query),
    initialData: requestsInitialData(),
  });
}

export async function getPaginatedRequests(pageParam = 0) {
  const result = await fetch(
    `/api/requests?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const requests = (await result.json()) as [string, string][];

  return {
    items: requests,
    next: pageParam + 1,
  };
}

export function usePaginatedRequests() {
  return useInfiniteQuery({
    queryKey: ["requests-paginated"],
    queryFn: ({ pageParam }) => getPaginatedRequests(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export function getRequestsForProject(accountId: AccountId) {
  return viewCall<[string, string, string][]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_requests",
    { account_id: accountId }
  );
}

export function useProjectRequests(accountId: AccountId) {
  return useQuery({
    queryKey: ["project-requests", accountId],
    queryFn: () => getRequestsForProject(accountId),
    enabled: !!accountId,
  });
}

export async function getRequest(accountId: AccountId, cid: CID) {
  const response = await fetch("/api/requests/" + accountId + "/" + cid);

  return requestSchema.parse(await response.json());
}

export function useRequest(accountId: AccountId, cid: CID, enabled = true) {
  return useQuery({
    queryKey: ["request", accountId, cid],
    queryFn: () => getRequest(accountId, cid),
    enabled,
  });
}
