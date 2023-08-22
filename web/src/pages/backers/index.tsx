import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Backer } from "~/components/backer";
import { ListPage } from "~/components/list-page";
import { usePaginatedBackers } from "~/lib/backers";
import { pageSize } from "~/lib/constants/pagination";
import { getBackers } from "../api/backers";
import { removeEmpty } from "~/lib/utils";
import { getBacker } from "../api/backers/[accountId]";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export default function Backers() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedBackers();

  return (
    <ListPage
      title="Backers"
      pages={(data?.pages ?? []).map(({ items }) => items)}
      loading={status === "loading"}
      fetchNextPage={() => {
        fetchNextPage().then(console.log).catch(console.error);
      }}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={(accountId) => <Backer accountId={accountId} />}
      hasNextPage={!!hasNextPage}
    />
  );
}

export const getServerSideProps = withIronSessionSsr(async function({ req }) {
  const user = req.session.user ?? null;
  const queryClient = new QueryClient();

  const backers = await getBackers({ limit: pageSize });

  queryClient.setQueryData(["backers-paginated"], {
    pages: [{ items: backers, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    backers.map((accountId) =>
      queryClient.prefetchQuery(["backer", accountId], {
        queryFn: async () => {
          const c = await getBacker(accountId);
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
