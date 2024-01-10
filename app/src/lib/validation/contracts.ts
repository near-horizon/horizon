import { z } from "zod";
import { type ProposalId, proposalIdSchema } from "./proposals";
import { accountIdSchema, transactionSchema } from "./common";

export const contributionStatusSchema = z.union([
  z.object({
    Created: z.string(),
  }),
  z.object({
    Accepted: z.string(),
  }),
  z.literal("Ongoing"),
  z.object({
    Delivered: z.string(),
  }),
  z.object({
    Completed: z.string(),
  }),
  z.object({
    Rejected: z.string(),
  }),
]);

export const contributionActionSchema = z.object({
  description: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
});

export type ContributionAction = z.infer<typeof contributionActionSchema>;

export type ContractId = ProposalId;

export const contractSchema = z.object({
  proposal_id: proposalIdSchema,
  status: contributionStatusSchema,
  actions: z.array(contributionActionSchema),
  vendor_feedback: z.string().nullable(),
  project_feedback: z.string().nullable(),
  price: z.number(),
  creationTx: transactionSchema.optional(),
  acceptanceTx: transactionSchema.optional(),
  rejectionTx: transactionSchema.optional(),
  actionTxs: z.array(transactionSchema).optional(),
  completionTx: transactionSchema.optional(),
  deliveryTx: transactionSchema.optional(),
});

export type Contract = z.infer<typeof contractSchema>;

export const contributorContractsSchema = z.array(
  z.tuple([accountIdSchema, accountIdSchema]),
);

export type ContributorContracts = z.infer<typeof contributorContractsSchema>;

export const contractsListSchema = z.array(proposalIdSchema);

export type ContractsList = z.infer<typeof contractsListSchema>;
