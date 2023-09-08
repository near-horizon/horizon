import { useRequestProposals } from "~/lib/proposal";
import { type CID, type AccountId } from "~/lib/validation/common";
import { Proposal } from "../proposal";

export function Proposals({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const { data } = useRequestProposals(accountId, cid);

  return (
    <div>
      {data?.map(([[projectId, cid], contributorId]) => (
        <div key={projectId + cid + contributorId}>
          <Proposal
            projectId={projectId}
            cid={cid}
            contributorId={contributorId}
            loading={projectId === "" && cid === "" && contributorId === ""}
          />
        </div>
      ))}
    </div>
  );
}
