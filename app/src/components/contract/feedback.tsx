"use client";

import { useContract } from "~/hooks/contracts";
import { type AccountId, type CID } from "~/lib/validation/common";

export function Feedback({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  contributorId: AccountId;
  cid: CID;
}) {
  const { data: contract } = useContract([[projectId, cid], contributorId]);

  if (!contract) {
    return <div>Feedback here.</div>;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-6">
      <section className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold">Project feedback</h3>
        <p>{contract.project_feedback ?? "No feedback yet"}</p>
      </section>
      <section className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold">Contributor feedback</h3>
        <p>{contract.vendor_feedback ?? "No feedback yet"}</p>
      </section>
    </div>
  );
}
