import { type NextApiResponse, type NextApiRequest } from "next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { type BackersQuery } from "~/lib/validation/backers";
import { fetchManyURLSchema } from "~/lib/validation/fetching";
import { intoURLSearchParams } from "~/lib/utils";

const backersURLQuerySchema = fetchManyURLSchema.extend({
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const backers = await getBackers(backersURLQuerySchema.parse(req.query));
      res.status(200).json(backers);
    }
  }
}
