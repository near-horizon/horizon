import { env } from "~/env.mjs";
import { viewCall } from "./fetching";
import { type AccountId, type CID } from "./validation/common";
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

export function requestsInitialData() {
  const initialData: [string, string][] = new Array<[string, string]>(3).fill([
    "",
    "",
  ]);

  return initialData;
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

export function getRequestsForProject(accountId: AccountId) {
  return viewCall<[string, string, string][]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_requests",
    { account_id: accountId }
  );
}

export async function getRequest(accountId: AccountId, cid: CID) {
  const response = await fetch("/api/requests/" + accountId + "/" + cid);

  return requestSchema.parse(await response.json());
}
