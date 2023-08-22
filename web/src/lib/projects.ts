import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { fetchManySchema, profileSchema } from "~/lib/fetching";
import {
  type AccountId,
  accountIdSchema,
  applicationSchema,
  permissionSchema,
  transactionSchema,
  intoURLSearchParams,
} from "~/lib/utils";
import { pageSize } from "./constants/pagination";

export const projectsQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.number(), z.number()])).optional(),
  distribution: z.array(z.string()).optional(),
});

export type ProjectsQuery = z.infer<typeof projectsQuerySchema>;

export async function getProjects(query: ProjectsQuery) {
  const result = await fetch("/api/projects?" + intoURLSearchParams(query));
  const projects = (await result.json()) as string[];
  return projects;
}

export async function getPaginatedProjects(pageParam = 0) {
  const result = await fetch(
    `/api/projects?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const projects = (await result.json()) as string[];

  return {
    items: projects,
    next: pageParam + 1,
  };
}

export function useProjects(query: ProjectsQuery) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: () => getProjects(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedProjects() {
  return useInfiniteQuery({
    queryKey: ["projects-paginated"],
    queryFn: ({ pageParam }) => getPaginatedProjects(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export async function getSimilarProjects(accountId: AccountId) {
  const result = await fetch(`/api/projects/${accountId}/similar`);
  const projects = (await result.json()) as string[];
  return projects;
}

export function useSimilarProjects(accountId: AccountId) {
  return useQuery({
    queryKey: ["similar-projects", accountId],
    queryFn: () => getSimilarProjects(accountId),
    enabled: !!accountId,
  });
}

export const horizonSchema = z.object({
  founders: z.array(accountIdSchema),
  team: z.record(accountIdSchema, z.array(permissionSchema)),
  why: z.string(),
  integration: z.string(),
  success_position: z.string(),
  problem: z.string(),
  vision: z.string(),
  deck: z.string(),
  white_paper: z.string(),
  roadmap: z.string(),
  demo: z.string(),
  tam: z.string(),
  geo: z.string(),
  verified: z.boolean(),
  application: applicationSchema,
});

export const projectSchema = horizonSchema
  .merge(
    profileSchema.omit({ team: true }).extend({
      company_size: z.string().optional(),
    })
  )
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export async function getProject(accountId: AccountId) {
  const response = await fetch("/api/projects/" + accountId);

  return projectSchema.parse(await response.json());
}

export function useProject(accountId: AccountId) {
  return useQuery({
    queryKey: ["project", accountId],
    queryFn: () => getProject(accountId),
    enabled: !!accountId,
  });
}
