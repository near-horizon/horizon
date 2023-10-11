"use client";

import { ListPage } from "~/components/list-page";
import { Request } from "~/components/request";
import { usePaginatedRequests } from "~/hooks/requests";

export function Requests() {
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
