import { type AccountId, imageSchema } from "~/lib/validation/common";
import { intoURLSearchParams } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import {
  type BackersDigest,
  backersDigestSchema,
  type HorizonProject,
  projectSchema,
  type ProjectsQuery,
} from "../validation/projects";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";
import deepEqual from "deep-equal";
import {
  newProjectSchema,
  type NewProjectType,
} from "../validation/project/new";

export async function getProjects(query: ProjectsQuery) {
  const result = await fetch("/api/projects?" + intoURLSearchParams(query));
  const projects = (await result.json()) as string[];
  return projects;
}

export async function getProjectsCount(query: ProjectsQuery) {
  const result = await fetch(
    "/api/projects/count?" + intoURLSearchParams(query),
  );
  const projects = (await result.json()) as number;
  return projects;
}

export async function getPaginatedProjects(
  pageParam = 0,
  query?: ProjectsQuery,
) {
  const result = await fetch(
    `/api/projects?limit=${pageSize}&from=` +
      pageParam * pageSize +
      (query ? "&" + intoURLSearchParams(query) : ""),
  );
  const projects = (await result.json()) as string[];

  return {
    items: projects,
    next: pageParam + 1,
  };
}

export async function getBackerPaginatedProjects(pageParam = 0) {
  const result = await fetch(
    `/api/projects?fundraising=${true}&limit=${pageSize}&from=` +
      pageParam * pageSize,
  );
  const projects = (await result.json()) as string[];

  return {
    items: projects,
    next: pageParam + 1,
  };
}

export async function getProject(accountId: AccountId) {
  const response = await fetch("/api/projects/" + accountId);

  return projectSchema.parse(await response.json());
}

export async function getNewProject(accountId: AccountId) {
  const response = await fetch("/api/projects/" + accountId + "/new");

  return newProjectSchema.parse(await response.json());
}

export async function updateNewProject(project: NewProjectType) {
  const response = await fetch("/api/projects/" + project.account_id + "/new", {
    method: "PUT",
    body: JSON.stringify(project),
  });

  return newProjectSchema.parse(await response.json());
}

export async function hasProject(accountId: AccountId) {
  try {
    await viewCall<HorizonProject>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_project",
      { account_id: accountId },
    );
    return true;
  } catch (e) {
    return false;
  }
}

export async function getProjectBackersDigest(accountId: AccountId) {
  const result = await fetch(`/api/projects/${accountId}/backers-digest`);

  return backersDigestSchema.parse(await result.json());
}

export async function updateProjectBackersDigest(
  accountId: AccountId,
  digest: BackersDigest,
) {
  return fetch(`/api/projects/${accountId}/backers-digest`, {
    method: "PUT",
    body: JSON.stringify(digest),
  });
}

export async function getProjectCompletion(accountId: AccountId) {
  const project = await getProject(accountId);

  const basicData = [
    project?.image && deepEqual(project.image, imageSchema.parse(undefined)),
    project?.name && project.name.length > 0,
    project?.tagline && project.tagline.length > 0,
    project?.description && project.description.length > 0,
    project?.website && project.website.length > 0,
    project?.linktree && Object.keys(project.linktree).length > 0,
    project?.verticals && Object.keys(project.verticals).length > 0,
    project?.product_type && Object.keys(project.product_type).length > 0,
    project?.company_size && project.company_size.length > 0,
    project?.geo && project.geo.length > 0,
    project?.problem && project.problem.length > 0,
    project?.success_position && project.success_position.length > 0,
    project?.why && project.why.length > 0,
    project?.vision && project.vision.length > 0,
  ];
  const techData = [
    project?.userbase && project.userbase.length > 0,
    project?.tam && project.tam.length > 0,
    project?.dev && project.dev.length > 0,
    project?.distribution && project.distribution.length > 0,
    project?.integration && project.integration.length > 0,
    project?.contracts && project.contracts.length > 0,
  ];
  const fundingData = [
    project?.stage && project.stage.length > 0,
    project?.fundraising && (project.fundraising as string).length > 0,
    project?.raise && (project.raise as string).length > 0,
    project?.investment && (project.investment as string).length > 0,
  ];
  const foundersData = [
    project?.founders && project.founders.length > 0,
    project?.team && Object.keys(project.team).length > 0,
  ];
  const filesData = [
    project?.deck && project.deck.length > 0,
    project?.white_paper && project.white_paper.length > 0,
    project?.roadmap && project.roadmap.length > 0,
    project?.team_deck && (project.team_deck as string).length > 0,
    project?.demo && project.demo.length > 0,
  ];
  return {
    basic: basicData.filter(Boolean).length / basicData.length,
    tech: techData.filter(Boolean).length / techData.length,
    funding: fundingData.filter(Boolean).length / fundingData.length,
    founders: foundersData.filter(Boolean).length / foundersData.length,
    files: filesData.filter(Boolean).length / filesData.length,
  };
}
