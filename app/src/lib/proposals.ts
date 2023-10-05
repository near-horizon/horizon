import { z } from "zod";
import { type AccountId, type CID } from "./validation/common";
import {
  type UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type ProposalId,
  proposalIdSchema,
  proposalSchema,
  type Proposal,
} from "./validation/proposals";
import { type Progress } from "./mutating";
import { useSignTx } from "~/stores/global";
import { useState } from "react";

export async function getProposal([
  [projectId, cid],
  contributorId,
]: ProposalId) {
  const proposal = await fetch(
    `/api/proposals/${projectId}/${contributorId}/${cid}`
  );

  return proposalSchema.parse(await proposal.json());
}

export function useProposal(id: ProposalId) {
  return useQuery({
    queryKey: ["proposal", id],
    queryFn: () => getProposal(id),
  });
}

export async function getRequestProposals(accountId: AccountId, cid: CID) {
  const proposals = await fetch(`/api/requests/${accountId}/${cid}/proposals`);

  return z.array(proposalIdSchema).parse(await proposals.json());
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
