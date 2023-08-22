import { z } from "zod";
import { type AccountId, accountIdSchema, transactionSchema } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { proposalIdSchema } from "./proposal";

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

export type ContractId = z.infer<typeof proposalIdSchema>;

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
  z.tuple([accountIdSchema, accountIdSchema])
);

export type ContributorContracts = z.infer<typeof contributorContractsSchema>;

export const contractsListSchema = z.array(proposalIdSchema);

export type ContractsList = z.infer<typeof contractsListSchema>;

export async function getContributorContracts(accountId: AccountId) {
  const contracts = await fetch(`/api/contributors/${accountId}/contracts`);

  return contractsListSchema.parse(await contracts.json());
}

export function useContributorContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "contributor", accountId],
    queryFn: () => getContributorContracts(accountId),
  });
}

export async function getProjectContracts(accountId: AccountId) {
  const contracts = await fetch(`/api/projects/${accountId}/contracts`);

  return contractsListSchema.parse(await contracts.json());
}

export function useProjectContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "project", accountId],
    queryFn: () => getProjectContracts(accountId),
  });
}

export async function getContributorCompletedContracts(accountId: AccountId) {
  const contracts = await fetch(
    `/api/contributors/${accountId}/contracts/completed`
  );

  return contractsListSchema.parse(await contracts.json());
}

export function useContributorCompletedContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "contributor", accountId, "completed"],
    queryFn: () => getContributorCompletedContracts(accountId),
  });
}

export async function getProjectCompletedContracts(accountId: AccountId) {
  const contracts = await fetch(
    `/api/projects/${accountId}/contracts/completed`
  );

  return contractsListSchema.parse(await contracts.json());
}

export function useProjectCompletedContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "project", accountId, "completed"],
    queryFn: () => getProjectCompletedContracts(accountId),
  });
}

export async function getContract([[projectId, cid], vendorId]: ContractId) {
  const contract = await fetch(
    `/api/contracts/${projectId}/${vendorId}/${cid}`
  );

  return contractSchema.parse(await contract.json());
}

export function useContract(id: ContractId) {
  return useQuery({
    queryKey: ["contract", id],
    queryFn: () => getContract(id),
  });
}
