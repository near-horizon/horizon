"use client";

import { Backer } from "~/components/backer";
import { Contributor } from "~/components/contributor";
import { List } from "~/components/home/list";
import { Project } from "~/components/project";
import { Request } from "~/components/request";
import { useBackers } from "~/hooks/backers";
import { useContributors } from "~/hooks/contributors";
import { useProjects } from "~/hooks/projects";
import { useRequests } from "~/hooks/requests";
import { useStats } from "~/hooks/fetching";
import { MainStats } from "~/components/main-stats";
import { type FetchMany } from "~/lib/validation/fetching";

const query = {
  from: 0,
  sort: "timedesc",
  limit: 8,
} satisfies FetchMany;

export function Home() {
  const { data: projects } = useProjects(query);
  const { data: requests } = useRequests(query);
  const { data: contributors } = useContributors(query);
  const { data: backers } = useBackers(query);
  const { data: stats } = useStats();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <MainStats />
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
