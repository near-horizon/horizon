import {
  useInfiniteQuery,
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import {
  type Backer,
  type BackersQuery,
  horizonSchema,
} from "~/lib/validation/backers";
import {
  getBacker,
  getBackers,
  getPaginatedBackers,
  hasBacker,
} from "~/lib/client/backers";
import { pageSize } from "~/lib/constants/pagination";
import { type Progress } from "~/lib/client/mutating";
import { type Profile, profileSchema } from "~/lib/validation/fetching";
import { privateProjectSchema } from "~/lib/validation/projects";
import { updateSession } from "~/lib/client/auth";

export function useBackers(query: BackersQuery) {
  return useQuery({
    queryKey: ["backers", query],
    queryFn: ({ queryKey: [, query] }) => getBackers(query as BackersQuery),
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

export function useBacker(accountId: AccountId) {
  return useQuery({
    queryKey: ["backer", accountId],
    queryFn: ({ queryKey: [, accountId] }) => getBacker(accountId!),
    enabled: !!accountId,
  });
}

export function useHasBacker(accountId?: AccountId) {
  return useQuery({
    queryKey: ["has-backer", accountId],
    queryFn: ({ queryKey: [, accountId] }) =>
      accountId ? hasBacker(accountId) : false,
    enabled: !!accountId,
  });
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
        await updateSession();
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
