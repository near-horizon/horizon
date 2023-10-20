import { env } from "~/env.mjs";
import type { AccountId, Transaction } from "../validation/common";
import { type Stats, statsSchema } from "../validation/fetching";

export async function getTransactions(): Promise<Transaction[]> {
  const projects = await fetch(env.API_URL + "/transactions/all");
  return projects.json() as Promise<Transaction[]>;
}

export async function getStats(): Promise<Stats> {
  const projects = await fetch(env.API_URL + "/transactions/stats");
  return statsSchema.parse(await projects.json());
}

export async function getFilteredTransactions(
  accountId: AccountId
): Promise<Transaction[]> {
  const allTransactions = await getTransactions();
  const filteredResults = allTransactions
    .filter(
      (tx) =>
        tx.method_name === "add_incentive" && tx.args.account_id === accountId
    )
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  return filteredResults;
}
