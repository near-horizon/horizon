import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { Projects } from "./projects";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { getProject, getProjects } from "~/lib/server/projects";

export default async function ProjectsPage() {
  const queryClient = getQueryClient();
  const projects = await getProjects({ limit: pageSize });

  queryClient.setQueryData(["projects-paginated"], {
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
      <Projects />
    </Hydrate>
  );
}
