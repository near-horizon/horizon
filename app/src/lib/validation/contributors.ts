import { z } from "zod";
import { fetchManySchema, profileSchema } from "./fetching";
import { accountIdSchema, permissionSchema, transactionSchema } from "./common";
import { paymentTypeSchema } from "./requests";

export const contributorsQuerySchema = fetchManySchema.extend({
  verified: z.array(z.boolean()).optional(),
  active: z.array(z.boolean()).optional(),
  org_type: z.array(z.string()).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  work: z.array(z.string()).optional(),
  rate: z.array(z.tuple([z.number(), z.number()])).optional(),
});

export type ContributorsQuery = z.infer<typeof contributorsQuerySchema>;

export const horizonSchema = z.object({
  permissions: z.record(accountIdSchema, z.array(permissionSchema)),
  verified: z.boolean(),
  credits: z.boolean(),
});

export const contributorProfileSchema = profileSchema.extend({
  services: z.string().optional(),
  active: z.string().optional(),
  vendor_type: z.string().optional(),
  payments: z.record(z.string(), z.string()).optional(),
  rate: z.string().optional(),
  work: z.record(z.string(), z.string()).optional(),
  company_size: z.string().optional(),
  tags: z.record(z.string(), z.string()).optional(),
  organization: z.string().optional(),
  location: z.string().optional(),
});

export const contributorSchema = horizonSchema
  .merge(contributorProfileSchema.omit({ team: true }))
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });
