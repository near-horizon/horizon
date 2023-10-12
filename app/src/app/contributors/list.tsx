"use client";

import { Contributor, ContributorSkeleton } from "./card";
import { List } from "~/components/home/list";
import { useContributors } from "~/hooks/contributors";
import { query } from "~/lib/constants/pagination";

export function ContributorsListSection({ count }: { count: number }) {
  const { data: contributors, status } = useContributors(query);

  if (status === "loading") {
    return <ContributorsListSectionSkeleton />;
  }

  if (status === "error") {
    return <span className="text-red-500">Error loading contributors</span>;
  }

  return (
    <List
      items={contributors}
      renderItem={(accountId) => <Contributor accountId={accountId} />}
      title="Contributors"
      count={count}
      link="/contributors"
      linkText="View all contributors"
    />
  );
}

export function ContributorsListSectionSkeleton() {
  return (
    <List
      items={[...new Array<string>(8).fill("")]}
      renderItem={() => <ContributorSkeleton />}
      title="Contributors"
      link="/contributors"
      linkText="View all contributors"
    />
  );
}
