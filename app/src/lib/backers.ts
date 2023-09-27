import {
  type UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { intoURLSearchParams } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "./constants/pagination";
import {
  backerSchema,
  type HorizonBacker,
  type BackersQuery,
  type Backer,
  horizonSchema,
} from "./validation/backers";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";
import { type Progress } from "./mutating";
import { type Profile, profileSchema } from "./validation/fetching";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import { privateProjectSchema } from "./validation/projects";

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

export async function hasBacker(accountId: AccountId) {
  try {
    await viewCall<HorizonBacker>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_contributor",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}

export function useCreateBacker(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      profile: Profile;
      email: string;
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
        profile,
        email,
      }: {
        accountId: AccountId;
        profile: Profile;
        email: string;
      }) => {
        try {
          setProgress({
            value: 25,
            label: "Registering backer on-chain...",
          });
          await signTx("register_investor", {
            account_id: accountId,
          });
        } catch (e) {
          setProgress({
            value: 25,
            label: "Failed to register backer!",
          });
          throw new Error("Failed to create backer");
        }
        setProgress({ value: 50, label: "Backer registered!" });

        setProgress({ value: 75, label: "Saving off-chain details..." });
        const response = await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({
            ...profile,
            email,
          }),
        });

        if (!response.ok) {
          setProgress({ value: 75, label: "Failed to save backer data!" });
          throw new Error("Failed to edit backer");
        }
        setProgress({ value: 100, label: "Off-chain details saved!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["backers"] });
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
      backer: Backer;
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
        backer,
      }: {
        accountId: AccountId;
        backer: Backer;
      }) => {
        const privateData = privateProjectSchema.parse(backer);
        const backerData = horizonSchema.parse(backer);
        const profileData = profileSchema.strip().parse(backer);

        if (Object.keys(backerData).length === 0) {
          setProgress({ value: 0, label: "Editing on-chain details..." });
          try {
            await signTx("edit_investor", {
              account_id: accountId,
              investor: backerData,
            });
          } catch (e) {
            setProgress({
              value: 0,
              label: "Failed to update on-chain backer data!",
            });
            throw new Error("Failed to update backer");
          }
          setProgress({ value: 33, label: "On-chain data saved!" });
        }

        if (Object.keys(privateData).length === 0) {
          setProgress({ value: 33, label: "Editing off-chain details..." });
          const response = await fetch("/api/backers/" + accountId, {
            method: "PUT",
            body: JSON.stringify(privateData),
          });

          if (!response.ok) {
            setProgress({
              value: 33,
              label: "Failed to update backer data!",
            });
            throw new Error("Failed to update backer");
          }
          setProgress({ value: 66, label: "Off-chain data saved!" });
        }

        if (Object.keys(profileData).length === 0) {
          setProgress({ value: 66, label: "Editing profile..." });
          const response = await fetch("/api/profile", {
            method: "PUT",
            body: JSON.stringify(profileData),
          });

          if (!response.ok) {
            setProgress({ value: 66, label: "Failed to update profile data!" });
            throw new Error("Failed to update profile");
          }
          setProgress({ value: 100, label: "Profile saved!" });
        }
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries(["backer", accountId]);
      },
    }),
  ];
}
