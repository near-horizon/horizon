import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { type AccountId } from "~/lib/utils";

async function getProjects(accountId: AccountId): Promise<string[]> {
  const projects = await fetch(
    `${env.API_URL}/data/projects/${accountId}/similar`
  );
  return projects.json() as Promise<string[]>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const projects = await getProjects(req.query.accountId as AccountId);
      res.status(200).json(projects);
    }
  }
}
