import { Overview } from "~/components/request/overview";
import { type CID, type AccountId } from "~/lib/validation/common";

export default function RequestOverview({
  params: { accountId, cid },
}: {
  params: { accountId: AccountId; cid: CID };
}) {
  return <Overview accountId={accountId} cid={cid} />;
}
