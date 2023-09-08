import { z } from "zod";
import { accountIdSchema, cidSchema, transactionSchema } from "./common";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  requestTypeSchema,
} from "./requests";

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
