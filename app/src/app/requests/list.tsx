"use client";

import { Request, RequestSkeleton } from "./card";
import { List } from "~/components/home/list";
import { useRequests } from "~/hooks/requests";
import { query } from "~/lib/constants/pagination";

export function RequestsListSection({ count }: { count: number }) {
  const { data: backers, status } = useRequests(query);

  if (status === "loading") {
    return <RequestsListSectionSkeleton />;
  }

  if (status === "error") {
    return <span className="text-red-500">Error loading requests</span>;
  }

  return (
    <List
      items={backers}
      renderItem={([accountId, cid]) => (
        <Request accountId={accountId} cid={cid} />
      )}
      title="Requests"
      count={count}
      link="/requests"
      linkText="View all requests"
    />
  );
}

export function RequestsListSectionSkeleton() {
  return (
    <List
      items={[...new Array<string>(8).fill("")]}
      renderItem={() => <RequestSkeleton />}
      title="Requests"
      link="/requests"
      linkText="View all requests"
    />
  );
}
