"use client";

import { format } from "timeago.js";
import { Availability } from "~/components/availability";
import { Tags } from "~/components/tags";
import {
  Card as CardBase,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRequest } from "~/hooks/requests";
import { formatBudget, formatDate } from "~/lib/utils";
import { type AccountId, type CID } from "~/lib/validation/common";
import { BankNote01Svg, Flag01Svg, User01Svg } from "~/icons";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { useContract } from "~/hooks/contracts";
import { useProposal } from "~/hooks/proposals";
import { IPFSImage } from "~/components/ipfs-image";
import { useContributor } from "~/hooks/contributors";

export function Card({
  projectId,
  contributorId,
  cid,
}: {
  projectId: AccountId;
  contributorId: AccountId;
  cid: CID;
}) {
  const { data: contract, status } = useContract([
    [projectId, cid],
    contributorId,
  ]);
  const { data: request, status: requestStatus } = useRequest(projectId, cid);
  const { data: proposal, status: proposalStatus } = useProposal([
    [projectId, cid],
    contributorId,
  ]);
  const { data: contributor, status: contributorStatus } =
    useContributor(contributorId);

  if (
    status === "loading" ||
    requestStatus === "loading" ||
    proposalStatus === "loading" ||
    contributorStatus === "loading"
  ) {
    return <CardSkeleton />;
  }

  if (
    status === "error" ||
    requestStatus === "error" ||
    proposalStatus === "error" ||
    contributorStatus === "error"
  ) {
    return <div>Error fetching contract with CID {cid}</div>;
  }
  const isActive =
    typeof contract.status === "string" || "Accepted" in contract.status;

  return (
    <CardBase className="border-none shadow-none">
      <CardHeader>
        <small className="text-xs text-text-gray">
          {format(contract.creationTx?.timestamp ?? new Date())}
        </small>
        <CardTitle className="font-semibold">
          <Link href={`/contracts/${projectId}/${contributorId}/${cid}`}>
            {request.title}
          </Link>
        </CardTitle>
        <Availability
          available={isActive}
          availableText="Active"
          unavailableText={
            typeof contract.status === "object"
              ? Object.keys(contract.status).at(0)
              : ""
          }
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{request.description}</CardDescription>
        <Tags tags={request.tags} loading={false} />
      </CardContent>
      <CardFooter className="gap-3">
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <Flag01Svg className="h-4" />
          {formatDate(Number(proposal.end_date))}
        </div>
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <BankNote01Svg className="h-4" />
          {formatBudget(contract.price)}
        </div>
        <Link
          href={`/contributors/${contributorId}`}
          className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400"
        >
          {contributor.image && "ipfs_cid" in contributor.image ? (
            <IPFSImage
              cid={contributor.image.ipfs_cid}
              className="h-5 w-5 rounded-full"
            />
          ) : (
            <User01Svg className="h-5 w-5 border border-e-ui-elements-gray bg-background-light" />
          )}
          <b>{contributor.name}</b>
          <small>@{contributorId}</small>
        </Link>
      </CardFooter>
    </CardBase>
  );
}

export function CardSkeleton() {
  return (
    <CardBase className="border-none shadow-none">
      <CardHeader>
        <small className="text-xs text-text-gray">
          <Skeleton className="h-4 w-10" />
        </small>
        <CardTitle className="font-semibold">
          <Skeleton className="h-4 w-48" />
        </CardTitle>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-1 h-4 w-96" />
        <Skeleton className="mb-1 h-4 w-[26rem]" />
        <Skeleton className="mb-1 h-4 w-80" />
        <Skeleton className="mb-1 h-4 w-[26rem]" />
        <Skeleton className="mb-1 h-4 w-80" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
      <CardFooter className="gap-3">
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <Flag01Svg className="h-4" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <BankNote01Svg className="h-4" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardFooter>
    </CardBase>
  );
}
