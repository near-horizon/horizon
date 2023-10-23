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
import { IPFSImage } from "~/components/ipfs-image";
import { Skeleton } from "~/components/ui/skeleton";
import UserIcon from "~/components/icons/user-02.svg";
import FlagIcon from "~/components/icons/flag-01.svg";
import MoneyIcon from "~/components/icons/bank-note-01.svg";
import FileIcon from "~/components/icons/file-02.svg";
import { Tags } from "~/components/tags";
import { useRequest } from "~/hooks/requests";
import { useProject } from "~/hooks/projects";
import { Availability } from "~/components/availability";
import { formatBudget, formatDate } from "~/lib/utils";

export function Request({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const { data, status } = useRequest(accountId, cid);
  const { data: project, status: projectStatus } = useProject(accountId);

  if (status === "loading") {
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
  } else if (projectStatus === "loading") {
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
          {project.image && "ipfs_cid" in project.image ? (
            <IPFSImage cid={project.image.ipfs_cid} className="h-7 w-7" />
          ) : (
            <UserIcon className="h-7 w-7" />
          )}
          <span className="text-lg font-medium">{project.name}</span>
        </h3>
      </Link>
    );
  }

  return (
    <Card className="flex h-full flex-col items-start justify-start">
      <CardHeader className="flex flex-col items-start justify-start gap-3">
        {projectSection}
        <CardTitle>
          <Link
            href={`/requests/${accountId}/${cid}`}
            className="text-lg font-medium"
          >
            {data.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Availability
          available={data.open}
          availableText="Open to proposals"
          unavailableText="Closed"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <Tags tags={data.tags ?? {}} loading={false} />
        <div className="flex h-5 flex-row items-center justify-start gap-4">
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <FlagIcon className="h-5" />
            {formatDate(Number(data.deadline))}
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <MoneyIcon className="h-5" />
            {formatBudget(data.budget)}
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <FileIcon className="h-5" />
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
            <FlagIcon className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <MoneyIcon className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
            <FileIcon className="h-5" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
