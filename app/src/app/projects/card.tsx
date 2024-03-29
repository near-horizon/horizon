"use client";

import { useProject } from "~/hooks/projects";
import { type AccountId } from "~/lib/validation/common";
import { Description } from "~/components/description";
import Link from "next/link";
import { useProjectRequests } from "~/hooks/requests";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { RequestSvg } from "~/icons";
import { Handle } from "~/components/handle";
import { Icon } from "~/components/icon";

export function Project({
  accountId,
  backerViewKey,
}: {
  accountId: AccountId;
  backerViewKey?: string;
}) {
  const { data, status } = useProject(accountId);
  const { data: requests, status: requestStatus } =
    useProjectRequests(accountId);

  if (status === "pending") {
    return <ProjectSkeleton />;
  }

  if (status === "error") {
    return (
      <span className="text-red-500">
        Error loading project with account ID {accountId}
      </span>
    );
  }

  let requestsSection;

  if (requestStatus === "pending") {
    requestsSection = <Skeleton className="h-4 w-32" />;
  } else if (requestStatus === "error") {
    requestsSection = (
      <span className="text-red-500">Error loading requests</span>
    );
  } else {
    requestsSection = (
      <span>
        {requests?.length ?? 0}{" "}
        {requests?.length === 1 ? "request" : "requests"}
      </span>
    );
  }

  return (
    <Card className="flex h-full flex-col items-start justify-start">
      <CardHeader className="flex max-w-full flex-row items-start justify-start gap-3">
        <CardTitle className="max-w-full">
          <Link
            className="flex h-20 max-w-full flex-row items-start justify-start gap-4"
            href={`/projects/${accountId}${
              backerViewKey ? "/backers-digest?from=" + backerViewKey : ""
            }`}
          >
            <Icon
              name={data.name ?? ""}
              image={data.image}
              className="h-16 w-16 flex-shrink-0 rounded-xl"
            />
            <Handle name={data.name} accountId={accountId} />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-w-full flex-grow">
        <div className="truncate font-medium">{data?.tagline}</div>
        <CardDescription>
          <Description text={data.description ?? ""} />
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          className="flex h-5 flex-row items-center justify-start gap-3 text-gray-400"
          href={`/projects/${accountId}/requests`}
        >
          <RequestSvg className="h-4" />
          {requestsSection}
        </Link>
      </CardFooter>
    </Card>
  );
}

export function ProjectSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-start gap-3">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />
        <CardTitle className="flex flex-grow flex-row flex-wrap items-start justify-start gap-2">
          <Skeleton className="h-4 w-[max(16rem,100%)]" />
          <Skeleton className="h-4 w-44" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-4 w-48" />
        <CardDescription className="flex flex-col gap-2">
          <Skeleton className="h-4 w-80 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </CardDescription>
      </CardContent>
      <CardFooter className="gap-2">
        <RequestSvg className="h-5 text-ui-elements-gray" />
        <Skeleton className="h-4 w-32" />
      </CardFooter>
    </Card>
  );
}
