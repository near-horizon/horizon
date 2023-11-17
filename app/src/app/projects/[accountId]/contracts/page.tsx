import { Contract } from "~/app/contracts/card";
import { getProjectContracts } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";

export default async function ProjectContracts({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const data = await getProjectContracts(accountId);

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
