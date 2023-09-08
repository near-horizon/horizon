import { type NextApiResponse, type NextApiRequest } from "next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { fetchManyURLSchema } from "~/lib/validation/fetching";
import { type ProjectsQuery } from "~/lib/validation/projects";
import { intoURLSearchParams } from "~/lib/utils";

const projectsURLQuerySchema = fetchManyURLSchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.string(), z.string()])).optional(),
  distribution: z.array(z.string()).optional(),
});

export async function getProjects(
  query: z.infer<typeof projectsURLQuerySchema> | ProjectsQuery
): Promise<string[]> {
  const projects = await fetch(
    env.API_URL + "/data/projects?" + intoURLSearchParams(query)
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
      const projects = await getProjects(
        projectsURLQuerySchema.parse(req.query)
      );
      res.status(200).json(projects);
    }
  }
}
