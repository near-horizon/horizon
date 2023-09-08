import { type AccountId } from "./validation/common";
import { useQuery } from "@tanstack/react-query";
import {
  type ContractId,
  contractSchema,
  contractsListSchema,
} from "./validation/contracts";

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
