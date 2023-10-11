"use client";

import { useContributorContracts } from "~/hooks/contracts";
import { type AccountId } from "~/lib/validation/common";
import { Contract } from "../contract";

export function Contracts({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributorContracts(accountId);

  return (
    <div className="flex flex-col gap-3">
      {status === "loading"
        ? "Loading..."
        : data?.map((contractId) => (
            <div key={contractId.toString()}>
              <Contract contractId={contractId} showContributor={false} />
            </div>
          ))}
    </div>
  );
}
