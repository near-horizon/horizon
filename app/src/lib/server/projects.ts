import { z } from "zod";
import {
  fetchManyURLSchema,
  type Profile,
  profileSchema,
} from "../validation/fetching";
import {
  type BackersDigest,
  backersDigestSchema,
  horizonSchema,
  projectSchema,
  type ProjectsQuery,
} from "../validation/projects";
import { env } from "~/env.mjs";
import { intoURLSearchParams, removeEmpty, removeNulls } from "../utils";
import { getProfile, viewCall } from "../fetching";
import { getTransactions } from "./transactions";
import { type AccountId, imageSchema } from "../validation/common";
import { projectRequestsSchema } from "../validation/requests";
import {
  type ContractId,
  contractsListSchema,
  type ContributorContracts,
} from "../validation/contracts";
import deepEqual from "deep-equal";
import { type IronSession } from "iron-session";
import { hasBacker } from "./backers";
import { headers } from "next/headers";
import { backersViewFromKey } from "../constants/backers-digest";

export const projectsURLQuerySchema = fetchManyURLSchema.extend({
  vertical: z.array(z.string()).optional().or(z.string().optional()),
  integration: z.array(z.string()).optional().or(z.string().optional()),
  dev: z.array(z.string()).optional().or(z.string().optional()),
  stage: z.array(z.string()).optional().or(z.string().optional()),
  size: z.array(z.tuple([z.string(), z.string()])).optional(),
  distribution: z.array(z.string()).optional().or(z.string().optional()),
  fundraising: z.string().optional(),
});

export async function getProjects(
  query: z.infer<typeof projectsURLQuerySchema> | ProjectsQuery
): Promise<string[]> {
  const projects = await fetch(
    env.API_URL + "/data/projects?" + intoURLSearchParams(query),
    {
      headers: {
        Authorization: `Bearer ${env.API_KEY}`,
      },
    }
  );
  return projects.json() as Promise<string[]>;
}

export async function getProjectsCount(
  query: z.infer<typeof projectsURLQuerySchema> | ProjectsQuery
): Promise<number> {
  const projects = await fetch(
    env.API_URL + "/data/projects/count?" + intoURLSearchParams(query),
    {
      headers: {
        Authorization: `Bearer ${env.API_KEY}`,
      },
    }
  );
  return projects.json() as Promise<number>;
}

export async function getChanges(accountId: AccountId) {
  const response = await fetch(
    `${env.API_URL}/data/projects/${accountId}/changes`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch changes");
  }

  return (await response.json()) as Profile;
}

export async function getProject(accountId: AccountId) {
  const [response, changes, horizonData, transactions] = await Promise.all([
    getProfile(accountId),
    getChanges(accountId),
    viewCall<z.infer<typeof horizonSchema>>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_project",
      {
        account_id: accountId,
      }
    ),
    getTransactions({ entity_type: "projects" }),
  ]);

  const { team: company_size, ...profile } = profileSchema.parse({
    ...removeEmpty(response),
    ...(changes ? removeNulls(changes) : {}),
  });
  const horizon = horizonSchema.parse(horizonData);
  const creationTx = transactions.findLast((tx) => {
    return tx.method_name === "add_project" && tx.args.account_id === accountId;
  });

  return projectSchema.parse({
    ...profile,
    ...horizon,
    company_size: typeof company_size === "string" ? company_size : "",
    account_id: accountId,
    creationTx,
  });
}

export async function hasProject(accountId: AccountId) {
  try {
    await getProject(accountId);
    return true;
  } catch (e) {
    return false;
  }
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

export async function getRequestsForProject(accountId: AccountId) {
  const response = await viewCall<[string, string, string][]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_requests",
    { account_id: accountId }
  );

  return projectRequestsSchema.parse(response);
}

export async function getProjectContracts(accountId: AccountId) {
  const contracts = await viewCall<ContributorContracts>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_contributions",
    { account_id: accountId }
  );

  const histories = await Promise.all(
    contracts.map(([project_id, vendor_id]) =>
      viewCall<string[]>(
        env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
        "get_contribution_history",
        { project_id, vendor_id }
      ).then((history) => history.map((cid) => [[project_id, cid], vendor_id]))
    )
  );

  const parsedHistories = contractsListSchema.parse(
    histories.reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, [])
  );

  return parsedHistories;
}

export async function getProjectCompletedContracts(accountId: AccountId) {
  const contracts = await viewCall<ContractId[]>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project_completed_contributions",
    { account_id: accountId }
  );

  const parsedHistories = contractsListSchema.parse(contracts);

  return parsedHistories;
}

export async function getBackersDigest(accountId: AccountId) {
  const response = await fetch(
    `${env.API_URL}/data/projects/${accountId}/backers-digest`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.API_KEY}`,
      },
    }
  );
  return backersDigestSchema.parse(await response.json());
}

export async function hasBackersDigest(accountId: AccountId) {
  const digest = await getBackersDigest(accountId);

  return Object.entries(digest).some(([, value]) => {
    if (typeof value === "string") {
      return value.length > 0;
    }

    if (typeof value === "object") {
      return value && Object.keys(value).length > 0;
    }

    return false;
  });
}

export async function updateBackersDigest(
  accountId: AccountId,
  backersDigest: BackersDigest
) {
  return fetch(`${env.API_URL}/data/projects/${accountId}/backers-digest`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.API_KEY}`,
    },
    body: JSON.stringify(backersDigest),
  });
}

export async function addBackersDigestToken(accountId: AccountId) {
  const response = await fetch(
    `${env.API_URL}/data/projects/${accountId}/backers-digest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.API_KEY}`,
      },
    }
  );

  return (await response.json()) as string;
}

export async function checkBackersDigestPermission(
  accountId: AccountId,
  user?: IronSession["user"] | null
) {
  const isBacker = !!user && (await hasBacker(user.accountId));
  const backersDigest = await getBackersDigest(accountId);
  const isOwner = !!user && user.accountId === accountId;
  const isPublished = !!backersDigest.published;
  const list = headers();
  const referer = list.get("referer");

  const from = referer ? new URL(referer).searchParams.get("from") : null;
  // const hasToken = !!token && token === backersDigest.token;
  const isFromBackerView = !!from && from === backersViewFromKey;

  return (
    isOwner || (isPublished && (isBacker || /* hasToken || */ isFromBackerView))
  );
}
