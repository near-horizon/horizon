"use client";

import { useProjectRequests } from "~/hooks/requests";
import { type AccountId } from "~/lib/validation/common";
import { Card, CardSkeleton } from "./card";
import { Separator } from "~/components/ui/separator";
import { type ReactNode } from "react";
import { NoData } from "~/components/empty";

export function List({ accountId }: { accountId: AccountId }) {
  const { data: requests, status } = useProjectRequests(accountId);

  if (status === "loading") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (!requests.length) {
    return (
      <NoData
        description="It looks like you don't have any requests yet"
        className="h-56"
      />
    );
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {requests.reduce((list, [accountId, cid]) => {
        if (list.length) {
          list.push(<Separator className="h-px w-full bg-background-light" />);
        }

        list.push(<Card accountId={accountId} cid={cid} key={cid} />);

        return list;
      }, new Array<ReactNode>(0))}
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {[...new Array(3).keys()].reduce((list) => {
        if (list.length) {
          list.push(<Separator className="h-px w-full bg-background-light" />);
        }

        list.push(<CardSkeleton />);

        return list;
      }, new Array<ReactNode>(0))}
    </div>
  );
}
