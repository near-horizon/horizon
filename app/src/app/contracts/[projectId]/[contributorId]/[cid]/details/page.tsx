import { Details } from "~/components/contract/details";
import { type CID, type AccountId } from "~/lib/validation/common";

export default function ContractDetails({
  params: { projectId, contributorId, cid },
}: {
  params: { projectId: AccountId; contributorId: AccountId; cid: CID };
}) {
  return (
    <Details projectId={projectId} contributorId={contributorId} cid={cid} />
  );
}
