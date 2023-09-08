import type { NextApiRequest, NextApiResponse } from "next";
import { type z } from "zod";
import { env } from "~/env.mjs";
import {
  backerProfileSchema,
  backerSchema,
  horizonSchema,
} from "~/lib/validation/backers";
import { getProfile, viewCall } from "~/lib/fetching";
import { accountIdSchema, type AccountId } from "~/lib/validation/common";
import { getTransactions } from "../../transactions/all";

export async function getBacker(accountId: AccountId) {
  const [response, horizonData, transactions] = await Promise.all([
    getProfile(accountId),
    viewCall<z.infer<typeof horizonSchema>>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_investor",
      {
        account_id: accountId,
      }
    ),
    getTransactions(),
  ]);

  const { team: company_size, ...profile } =
    backerProfileSchema.parse(response);
  const horizon = horizonSchema.parse(horizonData);
  const creationTx = transactions.find((tx) => {
    return (
      (tx.method_name === "register_investor" &&
        tx.args.account_id === accountId) ||
      (tx.method_name === "add_investors" &&
        accountId in (tx.args.investors as Record<string, unknown>))
    );
  });

  return backerSchema.parse({
    ...profile,
    ...horizon,
    company_size,
    account_id: accountId,
    creationTx,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const backer = await getBacker(
        accountIdSchema.parse(req.query.accountId)
      );
      res.status(200).json(backer);
    }
  }
}
