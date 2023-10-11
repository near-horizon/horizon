import { Feedback } from "~/components/contract/feedback";
import { type CID, type AccountId } from "~/lib/validation/common";

export default function ContractFeedback({
  params: { projectId, contributorId, cid },
}: {
  params: { projectId: AccountId; contributorId: AccountId; cid: CID };
}) {
  return (
    <Feedback projectId={projectId} contributorId={contributorId} cid={cid} />
  );
}
