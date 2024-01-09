import Link from "next/link";
import { Availability, AvailabilitySkeleton } from "~/components/availability";
import { Tags, TagsSkeleton } from "~/components/tags";
import { BankNote01Svg, Flag06Svg } from "~/icons";
import { DATE, NUMBER } from "~/lib/format";
import { getRequest } from "~/lib/server/requests";
import { getUserFromSession } from "~/lib/session";
import { type AccountId, type CID } from "~/lib/validation/common";
import { EditRequest } from "./edit";
import { Skeleton } from "~/components/ui/skeleton";
import { Suspense } from "react";
import { ProposalForm } from "~/app/proposals/form";

export function RequestCard({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  return (
    <Suspense fallback={<RequestCardSkeleton />}>
      <RequestCardAsync accountId={accountId} cid={cid} />
    </Suspense>
  );
}

export function RequestCardSkeleton() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div>
        <h4 className="font-semibold text-ui-elements-dark">
          <Skeleton className="h-4 w-48" />
        </h4>
      </div>

      <p className="w-full text-sm text-ui-elements-dark">
        <Skeleton className="mb-2 h-4 w-64" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-48" />
      </p>

      <TagsSkeleton />

      <div className="flex flex-row items-center justify-start gap-3">
        <div className="flex flex-row items-center justify-start gap-2">
          <Flag06Svg className="h-5 w-5 text-ui-elements-gray" />
          <span>
            <Skeleton className="h-4 w-16" />
          </span>
        </div>

        <div className="flex flex-row items-center justify-start gap-2">
          <BankNote01Svg className="h-5 w-5 text-ui-elements-gray" />
          <span>
            <Skeleton className="h-4 w-16" />
          </span>
        </div>

        <AvailabilitySkeleton />
      </div>
    </div>
  );
}

async function RequestCardAsync({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const user = await getUserFromSession();
  const request = await getRequest(accountId, cid);

  const isOwner = user.loggedIn && user.accountId === accountId;
  const isContributor =
    user.loggedIn &&
    user.hasProfile &&
    user.profileType === "contributor" &&
    !isOwner;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <Link href={`/requests/${accountId}/${cid}`}>
        <h4 className="font-semibold text-ui-elements-dark">{request.title}</h4>
      </Link>

      <p className="text-sm text-ui-elements-dark">{request.description}</p>

      <Tags tags={request.tags} />

      <div className="flex flex-row items-center justify-start gap-3">
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-ui-elements-gray">
          <Flag06Svg className="h-5 w-5" />
          <span>{DATE.date(request.deadline)}</span>
        </div>

        <div className="flex flex-row items-center justify-start gap-2 text-sm text-ui-elements-gray">
          <BankNote01Svg className="h-5 w-5" />
          <span>{NUMBER.compact(request.budget)}</span>
        </div>

        <Availability
          available={request.open}
          availableText="Receiving proposals"
          unavailableText="Closed"
        />
      </div>

      {isOwner && <EditRequest request={request} cid={cid} />}
      {isContributor && (
        <ProposalForm
          cid={cid}
          request={request}
          user_account_id={user.accountId}
        />
      )}
    </div>
  );
}
