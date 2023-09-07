import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { accountIdSchema, type AccountId } from "~/lib/utils";
import {
  type ContributorContracts,
  contractsListSchema,
} from "~/lib/contracts";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const projectContracts = await getProjectContracts(
        accountIdSchema.parse(req.query.accountId)
      );
      res.status(200).json(projectContracts);
    }
  }
}
