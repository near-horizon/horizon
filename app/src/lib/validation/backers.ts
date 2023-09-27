import { z } from "zod";
import { fetchManySchema, profileSchema } from "./fetching";
import { accountIdSchema, permissionSchema, transactionSchema } from "./common";

export const backersQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
});

export type BackersQuery = z.infer<typeof backersQuerySchema>;

export const horizonSchema = z.object({
  permissions: z.record(accountIdSchema, z.array(permissionSchema)),
  verified: z.boolean(),
});

export type HorizonBacker = z.infer<typeof horizonSchema>;

export const backerProfileSchema = profileSchema.extend({
  specialization: z.string().optional(),
  location: z.string().optional(),
});

export const backerSchema = horizonSchema
  .merge(backerProfileSchema.omit({ team: true }))
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export type Backer = z.infer<typeof backerSchema>;
