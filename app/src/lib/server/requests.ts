import { z } from "zod";
import { fetchManyURLSchema } from "../validation/fetching";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  type Request,
  requestSchema,
  type RequestsQuery,
  requestTypeSchema,
} from "../validation/requests";
import { env } from "~/env.mjs";
import { intoURLSearchParams } from "../utils";
import { type AccountId, type CID } from "../validation/common";
import { viewCall } from "../fetching";
import { getTransactions } from "./transactions";
import { type ProposalId } from "../validation/proposals";
import { contractsListSchema } from "../validation/contracts";

export const requestsURLQuerySchema = fetchManyURLSchema.extend({
  tags: z.array(z.string()).optional(),
  request_type: z.array(requestTypeSchema).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  source: z.array(paymentSourceSchema).optional(),
  budget: z.array(z.tuple([z.string(), z.string()])).optional(),
  by: z.number().optional(),
});

export async function getRequests(
  query: z.infer<typeof requestsURLQuerySchema> | RequestsQuery
): Promise<[string, string][]> {
  const response = await fetch(
    env.API_URL + "/data/requests?" + intoURLSearchParams(query)
  );
  return response.json() as Promise<[string, string][]>;
}

export async function getRequest(accountId: AccountId, cid: CID) {
  const [response, transactions] = await Promise.all([
    viewCall(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "get_request", {
      account_id: accountId,
      cid,
    }),
    getTransactions({ entity_type: "requests" }),
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

export async function getRequestProposals(accountId: AccountId, cid: string) {
  const contracts = await viewCall<ProposalId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_request_proposals",
    { account_id: accountId, cid }
  );

  return contractsListSchema.parse(contracts);
}
