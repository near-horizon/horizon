import { getRequestsForProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { RequestCard, RequestCardSkeleton } from "./card";
import { Suspense } from "react";
import { NoData } from "~/components/empty";

export function ProjectRequestsList({ accountId }: { accountId: AccountId }) {
  return (
    <Suspense fallback={<ProjectRequestsSkeleton />}>
      <ProjectRequestsAsync accountId={accountId} />
    </Suspense>
  );
}

function ProjectRequestsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <RequestCardSkeleton key={i} />
      ))}
    </>
  );
}

async function ProjectRequestsAsync({ accountId }: { accountId: AccountId }) {
  const data = await getRequestsForProject(accountId);

  if (!data.length) {
    return <NoData description="No requests yet" className="h-56 w-full" />;
  }

  return (
    <>
      {data.map(([, cid]) => (
        <RequestCard accountId={accountId} cid={cid} key={cid} />
      ))}
    </>
  );
}
