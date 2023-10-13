import { redirect } from "next/navigation";
import { getRequests } from "~/lib/server/requests";
import { type CID, type AccountId } from "~/lib/validation/common";

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
