import { z } from "zod";
import { fetchManyURLSchema, profileSchema } from "../validation/fetching";
import {
  horizonSchema,
  projectSchema,
  type ProjectsQuery,
} from "../validation/projects";
import { env } from "~/env.mjs";
import { intoURLSearchParams } from "../utils";
import { getProfile, viewCall } from "../fetching";
import { getTransactions } from "./transactions";
import { type AccountId } from "../validation/common";
import { projectRequestsSchema } from "../validation/requests";
import {
  type ContributorContracts,
  contractsListSchema,
  type ContractId,
} from "../validation/contracts";

export const projectsURLQuerySchema = fetchManyURLSchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.string(), z.string()])).optional(),
  distribution: z.array(z.string()).optional(),
});

export async function getProjects(
  query: z.infer<typeof projectsURLQuerySchema> | ProjectsQuery
): Promise<string[]> {
  const projects = await fetch(
    env.API_URL + "/data/projects?" + intoURLSearchParams(query)
  );
  return projects.json() as Promise<string[]>;
}

export async function getProject(accountId: AccountId) {
  const [response, horizonData, transactions] = await Promise.all([
    getProfile(accountId),
    viewCall<z.infer<typeof horizonSchema>>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_project",
      {
        account_id: accountId,
      }
    ),
    getTransactions(),
  ]);

  const { team: company_size, ...profile } = profileSchema.parse(response);
  const horizon = horizonSchema.parse(horizonData);
  const creationTx = transactions.find((tx) => {
    return tx.method_name === "add_project" && tx.args.account_id === accountId;
  });

  return projectSchema.parse({
    ...profile,
    ...horizon,
    company_size,
    account_id: accountId,
    creationTx,
  });
}

export async function getRequestsForProject(accountId: AccountId) {
  const response = await viewCall<[string, string, string][]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_requests",
    { account_id: accountId }
  );

  return projectRequestsSchema.parse(response);
}

export async function getProjectContracts(accountId: AccountId) {
  const contracts = await viewCall<ContributorContracts>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_contributions",
    { account_id: accountId }
  );

  const histories = await Promise.all(
    contracts.map(([project_id, vendor_id]) =>
      viewCall<string[]>(
        env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
        "get_contribution_history",
        { project_id, vendor_id }
      ).then((history) => history.map((cid) => [[project_id, cid], vendor_id]))
    )
  );

  const parsedHistories = contractsListSchema.parse(
    histories.reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, [])
  );

  return parsedHistories;
}

export async function getProjectCompletedContracts(accountId: AccountId) {
  const contracts = await viewCall<ContractId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_completed_contributions",
    { account_id: accountId }
  );

  const parsedHistories = contractsListSchema.parse(contracts);

  return parsedHistories;
}