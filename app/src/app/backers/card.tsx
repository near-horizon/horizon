"use client";

import { type AccountId } from "~/lib/validation/common";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Handle } from "~/components/handle";
import { Tags } from "~/components/tags";
import { useBacker } from "~/hooks/backers";
import { Icon } from "~/components/icon";

export function Backer({ accountId }: { accountId: AccountId }) {
  const { data, status } = useBacker(accountId);

  if (status === "loading") {
    return <BackerSkeleton />;
  }

  if (status === "error") {
    return (
      <span className="text-red-500">
        Error loading backer with account ID {accountId}
      </span>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-start gap-3">
        <Link
          className="flex h-20 max-w-full flex-row items-start justify-start gap-4"
          href={`/backers/${accountId}`}
        >
          <Icon
            name={data.name ?? ""}
            image={data.image}
            className="h-16 w-16 flex-shrink-0 rounded-lg"
          />
          <div className="max-w-full overflow-hidden">
            <Handle accountId={accountId} />
            {data.specialization && <span>{data.specialization}</span>}
          </div>
        </Link>
      </CardHeader>
      <CardFooter>
        <Tags tags={data.tags ?? {}} loading={false} />
      </CardFooter>
    </Card>
  );
}

export function BackerSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-start gap-3">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />
        <CardTitle className="flex flex-grow flex-row flex-wrap items-start justify-start gap-2">
          <Skeleton className="h-4 w-[min(16rem,100%)]" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-52" />
        </CardTitle>
      </CardHeader>
      <CardFooter className="gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </CardFooter>
    </Card>
  );
}
