import { getRequestsForProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { Request } from "~/app/requests/card";

export default async function ProjectRequests({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const data = await getRequestsForProject(accountId);
  return (
    <>
      {data.map(([, cid]) => (
        <div key={cid} className="w-full">
          <Request accountId={accountId} cid={cid} />
        </div>
      ))}
    </>
  );
}
