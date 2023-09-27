import {
  type UseMutationResult,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "./constants/pagination";
import { intoURLSearchParams } from "./utils";
import {
  type ContributorsQuery,
  contributorSchema,
  type HorizonContributor,
  horizonSchema,
  type Contributor,
} from "./validation/contributors";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";
import { type Progress } from "./mutating";
import { profileSchema, type Profile } from "./validation/fetching";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import { privateProjectSchema } from "./validation/projects";

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

export function useCreateContributor(): [
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
            label: "Registering contributor on-chain...",
          });
          await signTx("register_vendor", {
            account_id: accountId,
          });
        } catch (e) {
          setProgress({
            value: 25,
            label: "Failed to register contributor!",
          });
          throw new Error("Failed to create contributor");
        }
        setProgress({ value: 50, label: "Contributor registered!" });

        setProgress({ value: 75, label: "Saving off-chain details..." });
        const response = await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({
            ...profile,
            email,
          }),
        });

        if (!response.ok) {
          setProgress({ value: 75, label: "Failed to save contributor data!" });
          throw new Error("Failed to edit contributor");
        }
        setProgress({ value: 100, label: "Off-chain details saved!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contributors"] });
      },
    }),
  ];
}

export function useUpdateContributor(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      contributor: Contributor;
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
        contributor,
      }: {
        accountId: AccountId;
        contributor: Contributor;
      }) => {
        const privateData = privateProjectSchema.parse(contributor);
        const contributorData = horizonSchema.parse(contributor);
        const profileData = profileSchema.strip().parse(contributor);

        if (Object.keys(contributorData).length === 0) {
          setProgress({ value: 0, label: "Editing on-chain details..." });
          try {
            await signTx("edit_vendor", {
              account_id: accountId,
              vendor: contributorData,
            });
          } catch (e) {
            setProgress({
              value: 0,
              label: "Failed to update on-chain contributor data!",
            });
            throw new Error("Failed to update contributor");
          }
          setProgress({ value: 33, label: "On-chain data saved!" });
        }

        if (Object.keys(privateData).length === 0) {
          setProgress({ value: 33, label: "Editing off-chain details..." });
          const response = await fetch("/api/contributors/" + accountId, {
            method: "PUT",
            body: JSON.stringify(privateData),
          });

          if (!response.ok) {
            setProgress({
              value: 33,
              label: "Failed to update contributor data!",
            });
            throw new Error("Failed to update contributor");
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
        await queryClient.invalidateQueries(["contributor", accountId]);
      },
    }),
  ];
}
