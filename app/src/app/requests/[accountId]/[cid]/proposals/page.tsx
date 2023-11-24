import { redirect } from "next/navigation";
import { Proposal } from "~/app/proposals/card";
import { getRequestProposals } from "~/lib/server/requests";
import { getUserFromSession } from "~/lib/session";
import { type AccountId, type CID } from "~/lib/validation/common";

export default async function RequestProposals({
  params: { accountId, cid },
}: {
  params: { accountId: AccountId; cid: CID };
}) {
  const user = await getUserFromSession();
  const isAdmin = user.logedIn && user.accountId === accountId;

  if (!isAdmin) {
    return redirect(`/requests/${accountId}/${cid}/overview`);
  }

  const proposals = await getRequestProposals(accountId, cid);

  return (
    <div>
      {proposals.map(([[projectId, cid], contributorId]) => (
        <div key={projectId + cid + contributorId}>
          <Proposal
            projectId={projectId}
            cid={cid}
            contributorId={contributorId}
          />
        </div>
      ))}
    </div>
  );
}
