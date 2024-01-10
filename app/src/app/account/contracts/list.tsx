"use client";

import { type AccountId } from "~/lib/validation/common";
import { Contract, ContractSkeleton } from "~/app/contracts/card";
import { Separator } from "~/components/ui/separator";
import { type ReactNode } from "react";
import { useProjectContracts } from "~/hooks/contracts";
import { NoData } from "~/components/empty";

export function List({ accountId }: { accountId: AccountId }) {
  const { data: contracts, status } = useProjectContracts(accountId);

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (!contracts.length) {
    return (
      <NoData
        description="It looks like you don't have any contracts yet"
        className="h-56"
      />
    );
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {contracts.reduce((list, [[projectId, cid], contributorId]) => {
        if (list.length) {
          list.push(<Separator className="h-px w-full bg-background-light" />);
        }

        list.push(
          <Contract
            projectId={projectId}
            cid={cid}
            contributorId={contributorId}
          />,
        );

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

        list.push(<ContractSkeleton />);

        return list;
      }, new Array<ReactNode>(0))}
    </div>
  );
}
