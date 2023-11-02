import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { BackerProjects } from "./projects";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { getProject, getProjects } from "~/lib/server/projects";
import { env } from "~/env.mjs";

export default async function BackersProjectsPage() {
  const queryClient = getQueryClient();
  const projects = await getProjects({ limit: pageSize, fundraising: true });

  queryClient.setQueryData(["backer-projects-paginated"], {
    pages: [{ items: projects, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    projects.map((accountId) =>
      queryClient.prefetchQuery(["project", accountId], {
        queryFn: async () => {
          const p = await getProject(accountId);
          return removeEmpty(p);
        },
      })
    ),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <BackerProjects backerViewKey={env.SESSION_PASSWORD} />
    </Hydrate>
  );
}
