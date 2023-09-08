import { type NextApiResponse, type NextApiRequest } from "next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { fetchManyURLSchema } from "~/lib/validation/fetching";
import {
  type RequestsQuery,
  requestTypeSchema,
  paymentTypeSchema,
  paymentSourceSchema,
} from "~/lib/validation/requests";
import { intoURLSearchParams } from "~/lib/utils";

const requestsURLQuerySchema = fetchManyURLSchema.extend({
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const requests = await getRequests(
        requestsURLQuerySchema.parse(req.query)
      );
      res.status(200).json(requests);
    }
  }
}
