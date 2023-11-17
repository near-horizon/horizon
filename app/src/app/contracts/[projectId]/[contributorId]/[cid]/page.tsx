import { redirect } from "next/navigation";
import { type AccountId, type CID } from "~/lib/validation/common";

export default function ContractsPage({
  params: { projectId, cid, contributorId },
}: {
  params: { projectId: AccountId; cid: CID; contributorId: AccountId };
}) {
  return redirect(`/contracts/${projectId}/${contributorId}/${cid}/activity`);
}
