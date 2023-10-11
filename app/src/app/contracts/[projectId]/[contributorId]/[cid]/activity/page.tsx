import { Activity } from "~/components/contract/activity";
import { type CID, type AccountId } from "~/lib/validation/common";

export default function ContractActivity({
  params: { projectId, contributorId, cid },
}: {
  params: { projectId: AccountId; contributorId: AccountId; cid: CID };
}) {
  return (
    <Activity projectId={projectId} contributorId={contributorId} cid={cid} />
  );
}
