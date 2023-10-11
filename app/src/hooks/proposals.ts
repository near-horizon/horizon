import {
  type UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import { getProposal, getRequestProposals } from "~/lib/proposals";
import { type Proposal, type ProposalId } from "~/lib/validation/proposals";
import { type AccountId } from "~/lib/validation/common";
import { type Progress } from "~/lib/mutating";

export function useProposal(id: ProposalId) {
  return useQuery({
    queryKey: ["proposal", id],
    queryFn: () => getProposal(id),
  });
}

export function useRequestProposals(accountId: AccountId, cid: string) {
  return useQuery({
    queryKey: ["proposals", accountId, cid],
    queryFn: () => getRequestProposals(accountId, cid),
    initialData: [
      [["", ""], ""],
      [["", ""], ""],
      [["", ""], ""],
    ] as ProposalId[],
  });
}

export function useCreateProposal(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal: Proposal;
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
      mutationFn: async ({ proposal }: { proposal: Proposal }) => {
        try {
          setProgress({ value: 50, label: "Creating proposal on-chian..." });
          await signTx("add_proposal", { proposal });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to create proposal!" });
          throw new Error("Failed to create proposal!");
        }
        setProgress({ value: 100, label: "Proposal created!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["proposals"] });
      },
    }),
  ];
}
