import { viewCall } from "../fetching";
import { type AccountId } from "../validation/common";
import { type Profile } from "../validation/fetching";
import {
  type LearningCategory,
  type LearningResource,
} from "../validation/learn";
import { type SearchResult } from "../validation/search";
import { getBackers } from "./backers";
import { getContributors } from "./contributors";
import { learningResource } from "./learn";
import { getProjects } from "./projects";
import { getRequest, getRequests } from "./requests";

export async function getImagesAndNames(
  accountIds: AccountId[]
): Promise<Record<AccountId, { profile?: Profile }>> {
  const data = await viewCall<Record<AccountId, { profile?: Profile }>>(
    "social.near",
    "get",
    {
      keys: accountIds.map((accountId) => `${accountId}/profile/**`),
    }
  );

  return data;
}

export async function search(query: string): Promise<SearchResult> {
  const lowerCaseQuery = query.toLowerCase();
  const [projects, requests, contributors, backers] = await Promise.all([
    getProjects({ q: lowerCaseQuery }),
    getRequests({ q: lowerCaseQuery }),
    getContributors({ q: lowerCaseQuery }),
    getBackers({ q: lowerCaseQuery }),
  ]);

  const data = await getImagesAndNames(
    [
      ...new Set<AccountId>([
        ...projects.slice(0, 4),
        ...requests.map(([accountId]) => accountId).slice(0, 4),
        ...contributors.slice(0, 4),
        ...backers.slice(0, 4),
      ]),
    ].slice()
  );

  const requestsWithDetails = await Promise.all(
    requests.map(([accountId, cid]) => getRequest(accountId, cid))
  );

  const learningContent = learningResource.reduce((items, category) => {
    if (category.title.toLowerCase().includes(lowerCaseQuery)) {
      items.push(
        ...category.items.map((item) => ({ ...item, id: category.id }))
      );
    } else {
      const filteredItems = category.items.filter(
        ({ title, description }) =>
          title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery)
      );
      if (filteredItems.length > 0) {
        items.push(
          ...filteredItems.map((item) => ({ ...item, id: category.id }))
        );
      }
    }

    return items;
  }, new Array<LearningResource & Omit<LearningCategory, "items">>(0));

  return {
    projects: projects
      ? projects.map((project) => [project, data[project]?.profile ?? {}])
      : [],
    requests: requests
      ? requestsWithDetails.map((request) => ({
          ...request,
          image: data[request.project_id]?.profile?.image,
        }))
      : [],
    contributors: contributors
      ? contributors.map((contributor) => [
          contributor,
          data[contributor]?.profile ?? {},
        ])
      : [],
    backers: backers
      ? backers.map((backer) => [backer, data[backer]?.profile ?? {}])
      : [],
    learningContent: learningContent ?? [],
  };
}
