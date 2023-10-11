import { type AccountId } from "~/lib/validation/common";
import { intoURLSearchParams } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import {
  projectSchema,
  type ProjectsQuery,
  type HorizonProject,
} from "./validation/projects";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";

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

export async function getSimilarProjects(accountId: AccountId) {
  const result = await fetch(`/api/projects/${accountId}/similar`);
  const projects = (await result.json()) as string[];
  return projects;
}

export async function getProject(accountId: AccountId) {
  const response = await fetch("/api/projects/" + accountId);

  return projectSchema.parse(await response.json());
}

export async function hasProject(accountId: AccountId) {
  try {
    await viewCall<HorizonProject>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_project",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}
