import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { accountIdSchema, type AccountId } from "~/lib/validation/common";
import { contractsListSchema, type ContractId } from "~/lib/contracts";

export async function getContributorCompletedContracts(accountId: AccountId) {
  const contracts = await viewCall<ContractId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_vendor_completed_contributions",
    { account_id: accountId }
  );

  const parsedHistories = contractsListSchema.parse(contracts);

  return parsedHistories;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const contributorContracts = await getContributorCompletedContracts(
        accountIdSchema.parse(req.query.accountId)
      );
      res.status(200).json(contributorContracts);
    }
  }
}
