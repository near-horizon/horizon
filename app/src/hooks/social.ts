import { useSignTxs } from "~/stores/global";
import { type Profile } from "~/lib/validation/fetching";
import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { type Progress } from "~/lib/client/mutating";
import { useState } from "react";
import { calculateDeposit, createSocialUpdate } from "~/lib/client/social";

export function useSocialSet(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      profile: Partial<Profile>;
    },
    unknown
  >,
] {
  const signTxs = useSignTxs();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        accountId,
        profile,
      }: {
        accountId: AccountId;
        profile: Partial<Profile>;
      }) => {
        let deposit = 0n;
        setProgress({ value: 25, label: "Calculating deposit..." });
        try {
          deposit = await calculateDeposit(accountId, profile);
          setProgress({ value: 50, label: "Deposit calculated" });
        } catch (e) {
          console.error(e);
          setProgress({ value: 25, label: "Error calculating deposit" });
        }

        setProgress({ value: 75, label: "Signing transaction..." });
        await signTxs([createSocialUpdate(accountId, profile, deposit)]);
        setProgress({ value: 100, label: "Transaction signed" });
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries({
          queryKey: ["profile", accountId],
        });
      },
    }),
  ];
}
