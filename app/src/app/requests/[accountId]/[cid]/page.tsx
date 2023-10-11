import { redirect } from "next/navigation";
import { type CID, type AccountId } from "~/lib/validation/common";
import { getRequests } from "~/pages/api/requests";

export default function RequestPage({
  params: { accountId, cid },
}: {
  params: { accountId: AccountId; cid: CID };
}) {
  return redirect(`/requests/${accountId}/${cid}/overview`);
}

export async function generateStaticParams() {
  const requestIds = await getRequests({});

  return requestIds.map(([accountId, cid]) => ({ accountId, cid }));
}
