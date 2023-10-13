import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../query-client";
import { ProjectsListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { query } from "~/lib/constants/pagination";
import { getProject, getProjects } from "~/lib/server/projects";
import { getStats } from "~/lib/server/transactions";

export async function ProjectsListSectionLoader() {
  const queryClient = getQueryClient();
  const [projects, { projects: count }] = await Promise.all([
    getProjects(query),
    getStats(),
  ]);

  queryClient.setQueryData(["projects", query], projects);

  await Promise.all(
    projects.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["project", accountId],
        queryFn: async () => {
          const p = await getProject(accountId);
          return removeEmpty(p);
        },
      })
    )
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <ProjectsListSection count={count} />
    </Hydrate>
  );
}
