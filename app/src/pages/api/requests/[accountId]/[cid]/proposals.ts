import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import {
  accountIdSchema,
  type AccountId,
  cidSchema,
} from "~/lib/validation/common";
import { contractsListSchema } from "~/lib/contracts";
import { type ProposalId } from "~/lib/proposal";

export async function getRequestProposals(accountId: AccountId, cid: string) {
  const contracts = await viewCall<ProposalId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_request_proposals",
    { account_id: accountId, cid }
  );

  return contractsListSchema.parse(contracts);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const requestProposals = await getRequestProposals(
        accountIdSchema.parse(req.query.accountId),
        cidSchema.parse(req.query.cid)
      );
      res.status(200).json(requestProposals);
    }
  }
}
