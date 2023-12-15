import { z } from "zod";
import { env } from "~/env.mjs";
import {
  contributorProfileSchema,
  contributorSchema,
  type ContributorsQuery,
  horizonSchema,
} from "../validation/contributors";
import { intoURLSearchParams } from "../utils";
import { fetchManyURLSchema } from "../validation/fetching";
import { paymentTypeSchema } from "../validation/requests";
import { getProfile, viewCall } from "../client/fetching";
import { getTransactions } from "./transactions";
import { type AccountId } from "../validation/common";
import {
  type ContractId,
  contractsListSchema,
  type ContributorContracts,
} from "../validation/contracts";

export const contributorsURLQuerySchema = fetchManyURLSchema.extend({
  verified: z.array(z.string()).optional(),
  active: z.array(z.string()).optional(),
  org_type: z.array(z.string()).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  work: z.array(z.string()).optional(),
  rate: z.array(z.tuple([z.string(), z.string()])).optional(),
});

export async function getContributors(
  query: z.infer<typeof contributorsURLQuerySchema> | ContributorsQuery,
): Promise<string[]> {
  const response = await fetch(
    env.API_URL + "/data/vendors?" + intoURLSearchParams(query),
    { next: { revalidate: 60 } },
  );
  return response.json() as Promise<string[]>;
}

export async function getContributor(accountId: AccountId) {
  const [response, horizonData, transactions] = await Promise.all([
    getProfile(accountId),
    viewCall<z.infer<typeof horizonSchema>>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_vendor",
      {
        account_id: accountId,
      },
    ),
    getTransactions({ entity_type: "contributors" }),
  ]);

  const { team: company_size, ...profile } =
    contributorProfileSchema.parse(response);
  const horizon = horizonSchema.parse(horizonData);
  const creationTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "register_vendor" && tx.args.account_id === accountId
    );
  });

  return contributorSchema.parse({
    ...profile,
    ...horizon,
    company_size,
    account_id: accountId,
    creationTx,
  });
}

export async function hasContributor(accountId: AccountId) {
  try {
    await getContributor(accountId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getContributorContracts(accountId: AccountId) {
  const contracts = await viewCall<ContributorContracts>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_vendor_contributions",
    { account_id: accountId },
  );

  const histories = await Promise.all(
    contracts.map(([project_id, vendor_id]) =>
      viewCall<string[]>(
        env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
        "get_contribution_history",
        { project_id, vendor_id },
      ).then((history) => history.map((cid) => [[project_id, cid], vendor_id])),
    ),
  );

  const parsedHistories = contractsListSchema.parse(
    histories.reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, []),
  );

  return parsedHistories;
}

export async function getContributorCompletedContracts(accountId: AccountId) {
  const contracts = await viewCall<ContractId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_vendor_completed_contributions",
    { account_id: accountId },
  );

  const parsedHistories = contractsListSchema.parse(contracts);

  return parsedHistories;
}
