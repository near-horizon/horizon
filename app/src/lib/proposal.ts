import { z } from "zod";
import {
  type AccountId,
  accountIdSchema,
  transactionSchema,
  cidSchema,
  type CID,
} from "./validation/common";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  requestTypeSchema,
} from "./requests";
import { useQuery } from "@tanstack/react-query";

export const proposalSchema = z.object({
  request_id: z.tuple([accountIdSchema, z.string()]),
  vendor_id: accountIdSchema,
  title: z.string(),
  description: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  price: z.number(),
  proposal_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  payment_source: paymentSourceSchema,
  creationTx: transactionSchema.optional(),
});

export type Proposal = z.infer<typeof proposalSchema>;

export const proposalIdSchema = z.tuple([
  z.tuple([accountIdSchema, cidSchema]),
  accountIdSchema,
]);

export type ProposalId = z.infer<typeof proposalIdSchema>;

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
