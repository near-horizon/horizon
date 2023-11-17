import { Contract } from "~/app/contracts/card";
import { getContributorCompletedContracts } from "~/lib/server/contributors";
import { type AccountId } from "~/lib/validation/common";

export default async function ContributorHistory({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const data = await getContributorCompletedContracts(accountId);

  return (
    <>
      {data.map(([[projectId, cid], contributorId]) => (
        <div key={cid}>
          <Contract
            projectId={projectId}
            cid={cid}
            contributorId={contributorId}
          />
        </div>
      ))}
    </>
  );
}
