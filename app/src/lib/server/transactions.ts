import { env } from "~/env.mjs";
import { type Transaction } from "../validation/common";
import { type Stats, statsSchema } from "../validation/fetching";

export async function getTransactions(): Promise<Transaction[]> {
  const projects = await fetch(env.API_URL + "/transactions/all", {
    cache: "default",
  });
  return projects.json() as Promise<Transaction[]>;
}

export async function getStats(): Promise<Stats> {
  const projects = await fetch(env.API_URL + "/transactions/stats", {
    cache: "default",
  });
  return statsSchema.parse(await projects.json());
}
