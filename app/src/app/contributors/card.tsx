"use client";

import { type AccountId } from "~/lib/validation/common";
import { Description } from "~/components/description";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Handle } from "~/components/handle";
import { useContributor } from "~/hooks/contributors";
import { Tags } from "~/components/tags";
import { Icon } from "~/components/icon";

export function Contributor({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

  if (status === "loading") {
    return <ContributorSkeleton />;
  }

  if (status === "error") {
    return (
      <span className="text-red-500">
        Error loading backer with account ID {accountId}
      </span>
    );
  }

  let isOrganization = true;

  if (data.vendor_type) {
    isOrganization = data.vendor_type === "organization";
  } else if (data.organization) {
    isOrganization = data.organization === "true";
  }

  return (
    <Card className="flex h-full flex-col items-start justify-start">
      <CardHeader className="flex max-w-full flex-row items-start justify-start gap-3">
        <CardTitle className="max-w-full">
          <Link
            className="flex h-20 max-w-full flex-row items-start justify-start gap-4"
            href={`/contributors/${accountId}`}
          >
            <Icon
              name={data.name ?? ""}
              image={data.image}
              className="h-16 w-16 flex-shrink-0 rounded-lg"
            />
            <div className="flex max-w-full flex-col overflow-hidden">
              <Handle name={data.name} accountId={accountId} />
              <span className="text-sm font-normal">
                {isOrganization ? "Organization" : "Individual"}
              </span>
            </div>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>
          <Description text={data.description ?? data.tagline ?? ""} />
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Tags tags={data.tags ?? {}} />
      </CardFooter>
    </Card>
  );
}

export function ContributorSkeleton() {
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
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="flex flex-col gap-2">
          <Skeleton className="h-4 w-48" />
        </CardDescription>
        <Skeleton className="h-4 w-40" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </CardFooter>
    </Card>
  );
}
