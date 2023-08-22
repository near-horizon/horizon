import { type NextApiResponse, type NextApiRequest } from "next";
import { env } from "~/env.mjs";
import { type Stats, statsSchema } from "~/lib/fetching";

export async function getStats(): Promise<Stats> {
  const projects = await fetch(env.API_URL + "/transactions/stats", {
    cache: "default",
  });
  return statsSchema.parse(await projects.json());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const stats = await getStats();
      res.status(200).json(stats);
    }
  }
}
