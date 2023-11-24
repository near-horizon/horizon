"use client";

import { type AccountId, type CID } from "~/lib/validation/common";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { BankNote01Svg, File02Svg, Flag01Svg } from "~/icons";
import { Tags } from "~/components/tags";
import { useRequest } from "~/hooks/requests";
import { useProject } from "~/hooks/projects";
import { Availability } from "~/components/availability";
import { Icon } from "~/components/icon";
import { DATE, NUMBER } from "~/lib/format";

export function Request({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const { data, status } = useRequest(accountId, cid);
  const { data: project, status: projectStatus } = useProject(accountId);

  if (status === "pending") {
    return <RequestSkeleton />;
  }

  if (status === "error") {
    return (
      <span className="text-red-500">
        Error loading request from account ID {accountId}
        with CID {cid}
      </span>
    );
  }

  let projectSection;

  if (projectStatus === "error") {
    projectSection = (
      <span className="text-red-500">
        Error loading project with account ID {accountId}
      </span>
    );
  } else if (projectStatus === "pending") {
    projectSection = (
      <h3 className="flex flex-row items-start justify-start gap-4">
        <Skeleton className="h-7 w-7 rounded" />
        <Skeleton className="h-4 w-40" />
      </h3>
    );
  } else {
    projectSection = (
      <Link href={`/projects/${accountId}`}>
        <h3 className="flex flex-row items-start justify-start gap-4">
          <Icon
            name={project.name ?? ""}
            image={project.image}
            className="h-7 w-7"
          />
          <span className="text-lg font-medium">{project.name}</span>
        </h3>
      </Link>
    );
  }

  return (
    <Card className="flex h-full flex-col items-start justify-start">
      <CardHeader className="flex flex-col items-start justify-start gap-3">
        {projectSection}
        <Availability
          available={data.open}
          availableText="Open to proposals"
          unavailableText="Closed"
        />
        <CardTitle>
          <Link
            href={`/requests/${accountId}/${cid}`}
            className="text-lg font-medium"
          >
            {data.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-2">
        <Tags tags={data.tags ?? {}} />
        <div className="flex h-5 flex-row items-center justify-start gap-4">
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <Flag01Svg className="h-5" />
            {DATE.date(data.deadline)}
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <BankNote01Svg className="h-5" />
            {NUMBER.compact(data.budget)}
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <File02Svg className="h-5" />
            {data.request_type}
            {["Short", "Long"].includes(data.request_type) && " Term"}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function RequestSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start gap-3">
        <h3 className="flex flex-row items-start justify-start gap-4">
          <Skeleton className="h-7 w-7 rounded" />
          <Skeleton className="h-4 w-40" />
        </h3>
        <CardTitle className="flex flex-grow flex-row flex-wrap items-start justify-start gap-2">
          <Skeleton className="h-4 w-[min(16rem,100%)]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-20" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <div className="flex flex-row items-start justify-start gap-3">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex h-5 flex-row items-center justify-start gap-4">
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <Flag01Svg className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <BankNote01Svg className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <File02Svg className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
