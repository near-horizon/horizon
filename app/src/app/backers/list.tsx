"use client";

import { useBackers } from "~/hooks/backers";
import { Backer, BackerSkeleton } from "./card";
import { List } from "~/components/home/list";
import { query } from "~/lib/constants/pagination";

export function BackersListSection({ count }: { count: number }) {
  const { data: backers, status } = useBackers(query);

  if (status === "pending") {
    return <BackersListSectionSkeleton />;
  }

  if (status === "error") {
    return <span className="text-red-500">Error loading backers</span>;
  }

  return (
    <List
      items={backers}
      renderItem={(accountId) => <Backer accountId={accountId} />}
      title="Backers"
      count={count}
      link="/backers"
      linkText="View all backers"
    />
  );
}

export function BackersListSectionSkeleton() {
  return (
    <List
      items={[...new Array<string>(8).fill("")]}
      renderItem={() => <BackerSkeleton />}
      title="Backers"
      link="/backers"
      linkText="View all backers"
    />
  );
}
