import type { NextApiRequest, NextApiResponse } from "next";
import { type z } from "zod";
import { env } from "~/env.mjs";
import { getProfile, viewCall } from "~/lib/fetching";
import { accountIdSchema, type AccountId } from "~/lib/validation/common";
import { getTransactions } from "../../transactions/all";
import { horizonSchema, projectSchema } from "~/lib/validation/projects";
import { profileSchema } from "~/lib/validation/fetching";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const project = await getProject(
        accountIdSchema.parse(req.query.accountId)
      );
      res.status(200).json(project);
    }
  }
}
