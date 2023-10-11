import { redirect } from "next/navigation";
import { Proposals } from "~/components/request/proposals";
import { getUserFromSession } from "~/lib/session";
import { type AccountId, type CID } from "~/lib/validation/common";

export default async function RequestProposals({
  params: { accountId, cid },
}: {
  params: { accountId: AccountId; cid: CID };
}) {
  const user = await getUserFromSession();
  const isAdmin = !!user && user.accountId === accountId;

  if (!isAdmin) {
    return redirect(`/requests/${accountId}/${cid}/overview`);
  }

  return <Proposals accountId={accountId} cid={cid} />;
}
