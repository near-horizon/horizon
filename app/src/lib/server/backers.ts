import { z } from "zod";
import {
  horizonSchema,
  type BackersQuery,
  backerProfileSchema,
  backerSchema,
} from "../validation/backers";
import { fetchManyURLSchema } from "../validation/fetching";
import { env } from "~/env.mjs";
import { intoURLSearchParams } from "../utils";
import { type AccountId } from "../validation/common";
import { getProfile, viewCall } from "../fetching";
import { getTransactions } from "./transactions";

export const backersURLQuerySchema = fetchManyURLSchema.extend({
  vertical: z.array(z.string()).optional(),
});

export async function getBackers(
  query: z.infer<typeof backersURLQuerySchema> | BackersQuery
): Promise<string[]> {
  const response = await fetch(
    env.API_URL + "/data/investors?" + intoURLSearchParams(query)
  );
  return response.json() as Promise<string[]>;
}

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