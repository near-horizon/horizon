import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { projectRequestsSchema } from "~/lib/requests";
import { accountIdSchema, type AccountId } from "~/lib/utils";

export async function getRequestsForProject(accountId: AccountId) {
  const response = await viewCall<[string, string, string][]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_requests",
    { account_id: accountId }
  );

  return projectRequestsSchema.parse(response);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const requestsForProject = await getRequestsForProject(
        accountIdSchema.parse(req.query.accountId)
      );
      res.status(200).json(requestsForProject);
    }
  }
}
