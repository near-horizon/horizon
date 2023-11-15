"use client";

import { useProjectContracts } from "~/hooks/contracts";
import { type AccountId } from "~/lib/validation/common";
import { Contract } from "~/app/contracts/card";

export function Contracts({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectContracts(accountId);

  return (
    <div className="flex flex-col gap-3">
      {status === "loading"
        ? "Loading..."
        : data?.map(([[projectId, cid], contributorId]) => (
            <div key={cid}>
              <Contract
                projectId={projectId}
                cid={cid}
                contributorId={contributorId}
              />
            </div>
          ))}
    </div>
  );
}
