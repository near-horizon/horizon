"use client";

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
import { type AccountId, type CID } from "~/lib/validation/common";
import { BankNote01Svg, Flag01Svg, Mail01Svg } from "~/icons";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { DATE, NUMBER } from "~/lib/format";

export function Card({ accountId, cid }: { accountId: AccountId; cid: CID }) {
  const { data: request, status } = useRequest(accountId, cid);

  if (status === "loading") {
    return <CardSkeleton />;
  }

  if (status === "error") {
    return <div>Error fetching request with CID {cid}</div>;
  }

  return (
    <CardBase className="border-none shadow-none">
      <CardHeader>
        <small className="text-xs text-text-gray">
          {DATE.timeago(request.creationTx?.timestamp)}
        </small>
        <CardTitle className="font-semibold">
          <Link href={`/requests/${accountId}/${cid}`}>{request.title}</Link>
        </CardTitle>
        <Availability
          available={request.open}
          availableText="Receiving proposals"
          unavailableText="Closed"
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{request.description}</CardDescription>
        <Tags tags={request.tags} />
      </CardContent>
      <CardFooter className="gap-3">
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <Flag01Svg className="h-4" />
          {DATE.date(request.deadline)}
        </div>
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <BankNote01Svg className="h-4" />
          {NUMBER.compact(request.budget)}
        </div>
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-gray-400">
          <Mail01Svg className="h-4" />
          {request.request_type}
        </div>
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
          <Mail01Svg className="h-4" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardFooter>
    </CardBase>
  );
}
