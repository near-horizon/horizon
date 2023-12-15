import { getRequestsForProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { RequestCard, RequestCardSkeleton } from "./card";
import { Suspense } from "react";
import { NoData } from "~/components/empty";
import { Separator } from "~/components/ui/separator";

export function ProjectRequestsList({ accountId }: { accountId: AccountId }) {
  return (
    <Suspense fallback={<ProjectRequestsSkeleton />}>
      <ProjectRequestsAsync accountId={accountId} />
    </Suspense>
  );
}

function ProjectRequestsSkeleton() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6">
      {Array.from({ length: 3 }, () => 0).reduce((acc, _, index) => {
        if (index > 0) {
          acc.push(
            <Separator
              key={`separator-${index}`}
              className="h-px w-full bg-ui-elements-light"
            />,
          );
        }

        acc.push(<RequestCardSkeleton key={index} />);

        return acc;
      }, new Array<React.ReactNode>(0))}
    </div>
  );
}

async function ProjectRequestsAsync({ accountId }: { accountId: AccountId }) {
  const data = await getRequestsForProject(accountId);

  if (!data.length) {
    return <NoData description="No requests yet" className="h-56 w-full" />;
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-6">
      {data.reduce((acc, [, cid], index) => {
        if (index > 0) {
          acc.push(
            <Separator
              key={`separator-${index}`}
              className="h-px w-full bg-ui-elements-light"
            />,
          );
        }

        acc.push(<RequestCard accountId={accountId} cid={cid} key={cid} />);

        return acc;
      }, new Array<React.ReactNode>(0))}
    </div>
  );
}
