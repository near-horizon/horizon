import { z } from "zod";
import { accountIdSchema, cidSchema, transactionSchema } from "./common";
import { fetchManySchema } from "./fetching";

export const requestTypeSchema = z.enum([
  "OneTime",
  "Short",
  "Long",
  "FullTime",
]);

export const paymentTypeSchema = z.enum(["FlatRate", "TimeBased"]);

export const paymentSourceSchema = z.enum(["Credits", "Other"]);

export const requestSchema = z.object({
  cid: cidSchema.optional(),
  project_id: accountIdSchema,
  title: z.string(),
  description: z.string(),
  open: z.boolean(),
  request_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  tags: z.array(z.string()),
  source: paymentSourceSchema,
  deadline: z.string(),
  budget: z.number(),
  creationTx: transactionSchema.optional(),
});

export type Request = z.infer<typeof requestSchema>;

export const requestsQuerySchema = fetchManySchema.extend({
  tags: z.array(z.string()).optional(),
  request_type: z.array(requestTypeSchema).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  source: z.array(paymentSourceSchema).optional(),
  budget: z.array(z.tuple([z.number(), z.number()])).optional(),
  by: z.number().optional(),
});

export type RequestsQuery = z.infer<typeof requestsQuerySchema>;

export const projectRequestsSchema = z.array(
  z.tuple([accountIdSchema, cidSchema, z.string()])
);

export type ProjectRequests = z.infer<typeof projectRequestsSchema>;
