import { Contract } from "~/app/contracts/card";
import { getContributorContracts } from "~/lib/server/contributors";
import { type AccountId } from "~/lib/validation/common";

export default async function ContributorContracts({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const data = await getContributorContracts(accountId);

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
