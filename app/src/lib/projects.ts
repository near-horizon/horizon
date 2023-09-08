import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { intoURLSearchParams } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { projectSchema, type ProjectsQuery } from "./validation/projects";

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
