import { type NextApiResponse, type NextApiRequest } from "next";
import { env } from "~/env.mjs";
import { type Transaction } from "~/lib/validation/common";

export async function getTransactions(): Promise<Transaction[]> {
  const projects = await fetch(env.API_URL + "/transactions/all", {
    cache: "default",
  });
  return projects.json() as Promise<Transaction[]>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const transactions = await getTransactions();
      res.status(200).json(transactions);
    }
  }
}
