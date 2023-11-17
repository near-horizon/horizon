import { getRequestsForProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { Request, RequestSkeleton } from "~/app/requests/card";
import { NoData } from "~/components/empty";

export async function Requests({ accountId }: { accountId: AccountId }) {
  const requests = await getRequestsForProject(accountId);

  if (!requests || requests.length === 0) {
    return (
      <NoData
        description="It looks like this project hasn't created any requests yet"
        className="h-48"
      />
    );
  }

  return (
    <div className="grid w-full max-w-full grid-cols-1 gap-8 overflow-x-scroll md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {requests.map(([, cid]) => (
        <div
          key={cid}
          className="md:[&:nth-child(n+7)]:hidden 2xl:[&:nth-child(n+7)]:block"
        >
          <Request accountId={accountId} cid={cid} />
        </div>
      ))}
    </div>
  );
}

export function RequestsSkeleton() {
  return (
    <div className="grid w-full max-w-full grid-cols-1 gap-8 overflow-x-scroll md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {[...Array(4).keys()].map((id) => (
        <div key={id}>
          <RequestSkeleton />
        </div>
      ))}
    </div>
  );
}
