import { env } from "~/env.mjs";
import type {
  AccountId,
  Transaction,
  TransactionQuery,
} from "../validation/common";
import { type Stats, statsSchema } from "../validation/fetching";

export async function getTransactions(
  query: TransactionQuery = {}
): Promise<Transaction[]> {
  const params: Record<string, string> = {};
  if (query.from) {
    params.from = query.from.toString();
  }
  if (query.limit) {
    params.limit = query.limit.toString();
  }
  if (query.entity_type) {
    params.entity_type = query.entity_type;
  }
  const projects = await fetch(
    env.API_URL + "/transactions/all?" + new URLSearchParams(params).toString()
  );
  return projects.json() as Promise<Transaction[]>;
}

export async function getStats(): Promise<Stats> {
  const projects = await fetch(env.API_URL + "/transactions/stats");
  return statsSchema.parse(await projects.json());
}

export async function getFilteredTransactions(
  accountId: AccountId
): Promise<Transaction[]> {
  const allTransactions = await getTransactions({ entity_type: "incentives" });
  const filteredResults = allTransactions
    .filter(
      (tx) =>
        tx.method_name === "add_incentive" && tx.args.account_id === accountId
    )
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  return filteredResults;
}
