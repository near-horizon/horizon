import { type NextApiResponse, type NextApiRequest } from "next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { type ContributorsQuery } from "~/lib/validation/contributors";
import { fetchManyURLSchema } from "~/lib/validation/fetching";
import { paymentTypeSchema } from "~/lib/validation/requests";
import { intoURLSearchParams } from "~/lib/utils";

const contributorsURLQuerySchema = fetchManyURLSchema.extend({
  verified: z.array(z.string()).optional(),
  active: z.array(z.string()).optional(),
  org_type: z.array(z.string()).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  work: z.array(z.string()).optional(),
  rate: z.array(z.tuple([z.string(), z.string()])).optional(),
});

export async function getContributors(
  query: z.infer<typeof contributorsURLQuerySchema> | ContributorsQuery
): Promise<string[]> {
  const response = await fetch(
    env.API_URL + "/data/vendors?" + intoURLSearchParams(query)
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
      const contributors = await getContributors(
        contributorsURLQuerySchema.parse(req.query)
      );
      res.status(200).json(contributors);
    }
  }
}
