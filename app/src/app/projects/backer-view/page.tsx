import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BackerProjects } from "./projects";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { getProject, getProjects } from "~/lib/server/projects";
import { env } from "~/env.mjs";

export default async function BackersProjectsPage() {
  const queryClient = new QueryClient();
  const projects = await getProjects({ limit: pageSize, fundraising: true });

  queryClient.setQueryData(["backer-projects-paginated"], {
    pages: [{ items: projects, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    projects.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["project", accountId],
        queryFn: async () => {
          const p = await getProject(accountId);
          return removeEmpty(p);
        },
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BackerProjects backerViewKey={env.SESSION_PASSWORD} />
    </HydrationBoundary>
  );
}
