"use client";

import { useProfile } from "~/hooks/fetching";
import { type AccountId } from "~/lib/validation/common";
import { FounderIcon } from "~/components/founder/icon";
import { Socials, SocialsSkeleton } from "~/components/socials";
import { Skeleton } from "~/components/ui/skeleton";

export function Founder({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useProfile(accountId, !loading);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-4 rounded-2xl bg-gray-200 px-4 py-6 shadow-md shadow-gray-400">
      <FounderIcon accountId={accountId} loading={loading} size="large" />
      <a
        className="flex flex-col items-center justify-start gap-2"
        href={
          loading
            ? ""
            : `https://near.org/near/widget/ProfilePage?accountId=${accountId}`
        }
        target="_blank"
        referrerPolicy="origin"
      >
        {status === "loading" || loading ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <b>{data?.name}</b>
        )}
        {status === "loading" || loading ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <span>{accountId}</span>
        )}
      </a>
      <Socials links={data?.linktree ?? {}} loading={loading} />
    </div>
  );
}

export function FounderSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-4 rounded-2xl bg-gray-200 px-4 py-6 shadow-md shadow-gray-400">
      <FounderIcon accountId="" loading size="large" />
      <div className="flex flex-col items-center justify-start gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <SocialsSkeleton />
      </div>
    </div>
  );
}
