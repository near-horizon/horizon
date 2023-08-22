import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ListPage } from "~/components/list-page";
import { Project } from "~/components/project";
import { usePaginatedProjects } from "~/lib/projects";
import { getProjects } from "../api/projects";
import { pageSize } from "~/lib/constants/pagination";
import { getProject } from "../api/projects/[accountId]";
import { removeEmpty } from "~/lib/utils";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export default function Projects() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedProjects();

  return (
    <ListPage
      title="Projects"
      pages={(data?.pages ?? []).map(({ items }) => items)}
      loading={status === "loading"}
      fetchNextPage={() => {
        fetchNextPage().then(console.log).catch(console.error);
      }}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={(item) => <Project accountId={item} />}
      hasNextPage={!!hasNextPage}
    />
  );
}

export const getServerSideProps = withIronSessionSsr(async function({ req }) {
  const user = req.session.user ?? null;
  const queryClient = new QueryClient();

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

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
    },
  };
}, ironSessionConfig);
