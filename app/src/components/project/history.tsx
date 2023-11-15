"use client";

import { useProjectCompletedContracts } from "~/hooks/contracts";
import { type AccountId } from "~/lib/validation/common";
import { Contract } from "~/app/contracts/card";

export function History({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectCompletedContracts(accountId);

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
