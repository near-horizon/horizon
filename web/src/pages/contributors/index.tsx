import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Contributor } from "~/components/contributor";
import { ListPage } from "~/components/list-page";
import { usePaginatedContributors } from "~/lib/contributors";
import { getContributors } from "../api/contributors";
import { pageSize } from "~/lib/constants/pagination";
import { getContributor } from "../api/contributors/[accountId]";
import { removeEmpty } from "~/lib/utils";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export default function Requests() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedContributors();

  return (
    <ListPage
      title="Contributors"
      pages={(data?.pages ?? []).map(({ items }) => items)}
      loading={status === "loading"}
      fetchNextPage={() => {
        fetchNextPage().then(console.log).catch(console.error);
      }}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={(accountId) => <Contributor accountId={accountId} />}
      hasNextPage={!!hasNextPage}
    />
  );
}

export const getServerSideProps = withIronSessionSsr(async function({ req }) {
  const user = req.session.user ?? null;
  const queryClient = new QueryClient();

  const contributors = await getContributors({ limit: pageSize });

  queryClient.setQueryData(["contributors-paginated"], {
    pages: [{ items: contributors, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    contributors.map((accountId) =>
      queryClient.prefetchQuery(["contributor", accountId], {
        queryFn: async () => {
          const c = await getContributor(accountId);
          return removeEmpty(c);
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
