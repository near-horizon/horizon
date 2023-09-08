import { z } from "zod";
import { type AccountId, type CID } from "./validation/common";
import { useQuery } from "@tanstack/react-query";
import {
  type ProposalId,
  proposalIdSchema,
  proposalSchema,
} from "./validation/proposals";

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
