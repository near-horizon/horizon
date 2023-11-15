import {
  useInfiniteQuery,
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import {
  getPaginatedRequests,
  getRequest,
  getRequests,
  getRequestsForProject,
} from "~/lib/client/requests";
import { type Request, type RequestsQuery } from "~/lib/validation/requests";
import { pageSize } from "~/lib/constants/pagination";
import { type AccountId, type CID } from "~/lib/validation/common";
import { type Progress } from "~/lib/client/mutating";

export function useRequests(query: RequestsQuery) {
  return useQuery({
    queryKey: ["requests", query],
    queryFn: () => getRequests(query),
  });
}

export function usePaginatedRequests() {
  return useInfiniteQuery({
    queryKey: ["requests-paginated"],
    queryFn: ({ pageParam }) => getPaginatedRequests(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export function useProjectRequests(accountId: AccountId) {
  return useQuery({
    queryKey: ["project-requests", accountId],
    queryFn: () => getRequestsForProject(accountId),
    enabled: !!accountId,
  });
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
