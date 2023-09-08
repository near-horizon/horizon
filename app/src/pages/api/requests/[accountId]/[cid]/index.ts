import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { requestSchema, type Request } from "~/lib/validation/requests";
import {
  accountIdSchema,
  type AccountId,
  cidSchema,
  type CID,
} from "~/lib/validation/common";
import { getTransactions } from "~/pages/api/transactions/all";

export async function getRequest(accountId: AccountId, cid: CID) {
  const [response, transactions] = await Promise.all([
    viewCall(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "get_request", {
      account_id: accountId,
      cid,
    }),
    getTransactions(),
  ]);

  const request = requestSchema.parse(response);
  request.cid = cid;
  request.creationTx = transactions.find((tx) => {
    if (!tx.log.startsWith("EVENT_JSON:")) return false;

    const logData = JSON.parse(tx.log.substring("EVENT_JSON:".length)) as {
      data: {
        cid: string;
      };
    };

    return (
      tx.method_name === "add_request" &&
      (tx.args.request as Request).project_id === accountId &&
      logData.data.cid === cid
    );
  });

  return request;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const request = await getRequest(
        accountIdSchema.parse(req.query.accountId),
        cidSchema.parse(req.query.cid)
      );
      res.status(200).json(request);
    }
  }
}
