import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Projects } from "./projects";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import {
  getProject,
  getProjects,
  getProjectsCount,
} from "~/lib/server/projects";

export default async function ProjectsPage() {
  const queryClient = new QueryClient();
  const [projects, count] = await Promise.all([
    getProjects({ limit: pageSize }),
    getProjectsCount({}),
  ]);

  queryClient.setQueryData(["projects-paginated"], {
    pages: [{ items: projects, next: 1 }],
    pageParams: [0],
  });

  queryClient.setQueryData(["projects-count"], count);

  await Promise.all([
    projects.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["project", accountId],
        queryFn: async () => {
          const p = await getProject(accountId);
          return removeEmpty(p);
        },
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Projects />
    </HydrationBoundary>
  );
}
