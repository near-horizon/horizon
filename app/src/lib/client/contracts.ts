import { type AccountId } from "../validation/common";
import {
  type ContractId,
  contractSchema,
  contractsListSchema,
} from "../validation/contracts";

export async function getContributorContracts(accountId: AccountId) {
  const contracts = await fetch(`/api/contributors/${accountId}/contracts`);

  return contractsListSchema.parse(await contracts.json());
}

export async function getProjectContracts(accountId: AccountId) {
  const contracts = await fetch(`/api/projects/${accountId}/contracts`);

  return contractsListSchema.parse(await contracts.json());
}

export async function getContributorCompletedContracts(accountId: AccountId) {
  const contracts = await fetch(
    `/api/contributors/${accountId}/contracts/completed`,
  );

  return contractsListSchema.parse(await contracts.json());
}

export async function getProjectCompletedContracts(accountId: AccountId) {
  const contracts = await fetch(
    `/api/projects/${accountId}/contracts/completed`,
  );

  return contractsListSchema.parse(await contracts.json());
}

export async function getContract([[projectId, cid], vendorId]: ContractId) {
  const contract = await fetch(
    `/api/contracts/${projectId}/${vendorId}/${cid}`,
  );

  return contractSchema.parse(await contract.json());
}
