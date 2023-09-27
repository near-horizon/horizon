import { env } from "~/env.mjs";
import { viewCall } from "./fetching";
import { type AccountId, type CID } from "./validation/common";
import {
  type UseMutationResult,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { pageSize } from "./constants/pagination";
import { intoURLSearchParams } from "./utils";
import {
  requestSchema,
  type RequestsQuery,
  type Request,
} from "./validation/requests";
import { type Progress } from "./mutating";
import { useSignTx } from "~/stores/global";
import { useState } from "react";

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

export function useCreateRequest(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      request: Omit<Request, "cid" | "creationTx">;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        accountId,
        request,
      }: {
        accountId: AccountId;
        request: Omit<Request, "cid" | "creationTx">;
      }) => {
        try {
          setProgress({ value: 50, label: "Creating request..." });
          await signTx("add_request", { account_id: accountId, request });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to create request!" });
          throw new Error("Failed to create request");
        }
        setProgress({ value: 100, label: "Request created!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["requests"] });
      },
    }),
  ];
}

export function useUpdateBacker(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      request: Request;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        accountId,
        request,
      }: {
        accountId: AccountId;
        request: Request;
      }) => {
        setProgress({ value: 50, label: "Editing on-chain details..." });
        try {
          await signTx("edit_request", { account_id: accountId, request });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to update on-chain data!" });
          throw new Error("Failed to update request");
        }
        setProgress({ value: 100, label: "On-chain data saved!" });
      },
      onSuccess: async (_, { accountId, request: { cid } }) => {
        await queryClient.invalidateQueries(["request", accountId, cid]);
      },
    }),
  ];
}
