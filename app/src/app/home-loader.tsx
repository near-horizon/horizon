import { Home } from "./home";
import { type FetchMany } from "~/lib/validation/fetching";
import { getQueryClient } from "./query-client";
import { getProjects } from "~/pages/api/projects";
import { getRequests } from "~/pages/api/requests";
import { getContributors } from "~/pages/api/contributors";
import { getBackers } from "~/pages/api/backers";
import { getStats } from "~/pages/api/transactions/stats";
import { getProject } from "~/pages/api/projects/[accountId]";
import { removeEmpty } from "~/lib/utils";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";
import { getContributor } from "~/pages/api/contributors/[accountId]";
import { getBacker } from "~/pages/api/backers/[accountId]";
import { Hydrate, dehydrate } from "@tanstack/react-query";

const query = {
  from: 0,
  sort: "timedesc",
  limit: 8,
} satisfies FetchMany;

export async function HomeLoader() {
  const queryClient = getQueryClient();
  await prefetch(queryClient);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
}

async function prefetch(queryClient: ReturnType<typeof getQueryClient>) {
  const [projects, requests, contributors, backers, stats] = await Promise.all([
    getProjects(query),
    getRequests(query),
    getContributors(query),
    getBackers(query),
    getStats(),
  ]);

  queryClient.setQueryData(["projects", query], projects);
  queryClient.setQueryData(["requests", query], requests);
  queryClient.setQueryData(["contributors", query], contributors);
  queryClient.setQueryData(["backers", query], backers);
  queryClient.setQueryData(["stats"], stats);

  await Promise.all([
    ...projects.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["project", accountId],
        queryFn: async () => {
          const p = await getProject(accountId);
          return removeEmpty(p);
        },
      })
    ),
    ...requests.map(([projectId, cid]) =>
      queryClient.prefetchQuery({
        queryKey: ["request", projectId, cid],
        queryFn: async () => {
          const r = await getRequest(projectId, cid);
          return removeEmpty(r);
        },
      })
    ),
    ...contributors.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["contributor", accountId],
        queryFn: async () => {
          const c = await getContributor(accountId);
          return removeEmpty(c);
        },
      })
    ),
    ...backers.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["backer", accountId],
        queryFn: async () => {
          const b = await getBacker(accountId);
          return removeEmpty(b);
        },
      })
    ),
  ]);
}
