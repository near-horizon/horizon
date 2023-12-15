import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSignTx } from "~/stores/global";
import { getProposal, getRequestProposals } from "~/lib/client/proposals";
import { type Proposal, type ProposalId } from "~/lib/validation/proposals";
import { type AccountId } from "~/lib/validation/common";

export function useProposal(id: ProposalId) {
  return useQuery({
    queryKey: ["proposal", id],
    queryFn: ({ queryKey: [, id] }) => getProposal(id! as ProposalId),
  });
}

export function useRequestProposals(accountId: AccountId, cid: string) {
  return useQuery({
    queryKey: ["proposals", accountId, cid],
    queryFn: ({ queryKey: [, accountId, cid] }) =>
      getRequestProposals(accountId!, cid!),
  });
}

export function useCreateProposal() {
  const signTx = useSignTx();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposal }: { proposal: Proposal }) => {
      try {
        await signTx("add_proposal", { proposal });
      } catch (e) {
        throw new Error("Failed to create proposal!");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
