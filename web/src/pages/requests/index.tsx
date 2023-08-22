import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ListPage } from "~/components/list-page";
import { Request } from "~/components/request";
import { usePaginatedRequests } from "~/lib/requests";
import { getRequests } from "../api/requests";
import { pageSize } from "~/lib/constants/pagination";
import { getRequest } from "../api/requests/[accountId]/[cid]";
import { removeEmpty } from "~/lib/utils";
import { withIronSessionSsr } from "iron-session/next";
import { ironSessionConfig } from "~/lib/constants/iron-session";

export default function Requests() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedRequests();

  return (
    <ListPage
      title="Requests"
      pages={(data?.pages ?? []).map(({ items }) => items)}
      loading={status === "loading"}
      fetchNextPage={() => {
        fetchNextPage().then(console.log).catch(console.error);
      }}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={([accountId, cid]) => (
        <Request accountId={accountId} cid={cid} />
      )}
      hasNextPage={!!hasNextPage}
    />
  );
}

export const getServerSideProps = withIronSessionSsr(async function({ req }) {
  const user = req.session.user ?? null;
  const queryClient = new QueryClient();

  const requests = await getRequests({ limit: pageSize });

  queryClient.setQueryData(["requests-paginated"], {
    pages: [{ items: requests, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    requests.map(([accountId, cid]) =>
      queryClient.prefetchQuery(["request", accountId, cid], {
        queryFn: async () => {
          const r = await getRequest(accountId, cid);
          return removeEmpty(r);
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
