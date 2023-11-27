import { z } from "zod";

export const accountIdSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/);
// .refine(async (accountId) => {
//   return await checkIfAccountExists(accountId);
// }, {
//   message: "Account does not exist",
// });

export const cidSchema = z.string().min(34).max(59);

export type AccountId = z.infer<typeof accountIdSchema>;

export type CID = z.infer<typeof cidSchema>;

export const permissionSchema = z.enum(["Admin"]);

export type Permission = z.infer<typeof permissionSchema>;

export const applicationSchema = z.union([
  z.string().refine((s) => s === "NotSubmitted"),
  z.object({
    Submitted: z.string(),
  }),
  z.object({
    Rejected: z.string(),
  }),
  z.string().refine((s) => s === "Accepted"),
]);

export type Application = z.infer<typeof applicationSchema>;

export const placeholderImage =
  "https://img.icons8.com/?size=512&id=Dajn8muCcSHe&format=png";

export const imageSchema = z
  .union([
    z.object({
      url: z.string().url(),
    }),
    z.object({
      img: z.string().url(),
    }),
    z.object({
      ipfs_cid: z.string(),
    }),
    z.object({
      nft: z.object({
        contractId: accountIdSchema,
        tokenId: z.string(),
      }),
    }),
  ])
  .optional()
  .default({ img: placeholderImage });

export type Image = z.infer<typeof imageSchema>;

export const transactionSchema = z.object({
  id: z.number(),
  timestamp: z.number(),
  block_hash: z.string(),
  hash: z.string(),
  signer_id: accountIdSchema,
  method_name: z.string(),
  args: z.object({}).passthrough(),
  log: z.string(),
});

export const transactionsSchema = z.array(transactionSchema);

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionQuerySchema = z.object({
  from: z.number().optional(),
  limit: z.number().optional(),
  entity_type: z
    .enum([
      "projects",
      "contributors",
      "backers",
      "requests",
      "proposals",
      "contributions",
      "incentives",
    ])
    .optional(),
});

export type TransactionQuery = z.infer<typeof transactionQuerySchema>;
