import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Backer } from "~/components/backer";
import { Contributor } from "~/components/contributor";
import { List } from "~/components/home/list";
import { Project } from "~/components/project";
import { Request } from "~/components/request";
import { useBackers } from "~/lib/backers";
import { useContributors } from "~/lib/contributors";
import { useProjects } from "~/lib/projects";
import { useRequests } from "~/lib/requests";
import { getProjects } from "./api/projects";
import { getRequests } from "./api/requests";
import { getContributors } from "./api/contributors";
import { getBackers } from "./api/backers";
import { useStats } from "~/lib/fetching";
import { getProject } from "./api/projects/[accountId]";
import { getRequest } from "./api/requests/[accountId]/[cid]";
import { getContributor } from "./api/contributors/[accountId]";
import { getBacker } from "./api/backers/[accountId]";
import { removeEmpty } from "~/lib/utils";
import { getStats } from "./api/transactions/stats";
import { MainStats } from "~/components/main-stats";
import { withSSRSession } from "~/lib/auth";
import { type FetchMany } from "~/lib/validation/fetching";

const query = {
  from: 0,
  sort: "timedesc",
  limit: 8,
} satisfies FetchMany;

export default function Home() {
  const { data: projects } = useProjects(query);
  const { data: requests } = useRequests(query);
  const { data: contributors } = useContributors(query);
  const { data: backers } = useBackers(query);
  const { data: stats } = useStats();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="w-1/2 text-4xl font-bold">Explore NEAR Horizon</h1>
        <div className="w-1/2">
          <MainStats />
        </div>
      </div>
      <List
        items={projects ?? []}
        renderItem={(accountId) => (
          <Project accountId={accountId} loading={accountId === ""} />
        )}
        title="Projects"
        count={stats?.projects ?? 0}
        link="/projects"
        linkText="View all projects"
      />
      <List
        items={requests ?? []}
        renderItem={([projectId, cid]) => (
          <Request
            accountId={projectId}
            cid={cid}
            loading={projectId === "" || cid === ""}
          />
        )}
        title="Requests"
        count={stats?.requests ?? 0}
        link="/requests"
        linkText="View all requests"
      />
      <List
        items={contributors ?? []}
        renderItem={(accountId) => (
          <Contributor accountId={accountId} loading={accountId === ""} />
        )}
        title="Contributors"
        count={stats?.contributors ?? 0}
        link="/contributors"
        linkText="View all contributors"
      />
      <List
        items={backers ?? []}
        renderItem={(accountId) => (
          <Backer accountId={accountId} loading={accountId === ""} />
        )}
        title="Backers"
        count={stats?.backers ?? 0}
        link="/backers"
        linkText="View all backers"
      />
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function() {
  const queryClient = new QueryClient();

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
