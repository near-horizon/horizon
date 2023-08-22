import { env } from "~/env.mjs";
import { fetchManySchema, viewCall } from "./fetching";
import {
  accountIdSchema,
  type AccountId,
  transactionSchema,
  cidSchema,
  type CID,
  intoURLSearchParams,
} from "./utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { pageSize } from "./constants/pagination";

export const requestTypeSchema = z.enum([
  "OneTime",
  "Short",
  "Long",
  "FullTime",
]);

export const paymentTypeSchema = z.enum(["FlatRate", "TimeBased"]);

export const paymentSourceSchema = z.enum(["Credits", "Other"]);

export const requestSchema = z.object({
  cid: cidSchema.optional(),
  project_id: accountIdSchema,
  title: z.string(),
  description: z.string(),
  open: z.boolean(),
  request_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  tags: z.array(z.string()),
  source: paymentSourceSchema,
  deadline: z.string(),
  budget: z.number(),
  creationTx: transactionSchema.optional(),
});

export type Request = z.infer<typeof requestSchema>;

export const requestsQuerySchema = fetchManySchema.extend({
  tags: z.array(z.string()).optional(),
  request_type: z.array(requestTypeSchema).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  source: z.array(paymentSourceSchema).optional(),
  budget: z.array(z.tuple([z.number(), z.number()])).optional(),
  by: z.number().optional(),
});

export type RequestsQuery = z.infer<typeof requestsQuerySchema>;

export const projectRequestsSchema = z.array(
  z.tuple([accountIdSchema, cidSchema, z.string()])
);

export type ProjectRequests = z.infer<typeof projectRequestsSchema>;

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
