"use client";

import { type ReactNode } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DATE } from "~/lib/format";

export function Action({
  description,
  time,
  transactionHash,
}: {
  description: ReactNode;
  time: string | number;
  transactionHash?: string;
}) {
  return (
    <div className="relative ml-4 flex flex-col items-start justify-start gap-1 border-l-2 border-l-gray-200 pb-6 pl-7 last:border-l-transparent">
      <div className="absolute left-0 top-0 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-green-400">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33333 8L0 4.59574L1.16667 3.40426L3.33333 5.61702L8.83333 0L10 1.19149L3.33333 8Z"
            fill="white"
          />
        </svg>
      </div>

      <span>{description}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm font-normal text-gray-400">
            {DATE.timeago(time)}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">{DATE.time(time)}</TooltipContent>
      </Tooltip>
      {transactionHash ? (
        <small>
          TX:{" "}
          <a
            href={`https://nearblocks.io/txns/${transactionHash}`}
            target="_blank"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {transactionHash}
          </a>
        </small>
      ) : (
        <></>
      )}
    </div>
  );
}

export function ActionSkeleton() {
  return (
    <div className="relative ml-4 flex flex-col items-start justify-start gap-1 border-l-2 border-l-gray-200 pb-6 pl-7 last:border-l-transparent">
      <div className="absolute left-0 top-0 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-green-400">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33333 8L0 4.59574L1.16667 3.40426L3.33333 5.61702L8.83333 0L10 1.19149L3.33333 8Z"
            fill="white"
          />
        </svg>
      </div>

      <span>
        <Skeleton className="h-4 w-48" />
      </span>
      <span className="text-sm font-normal text-gray-400">
        <Skeleton className="h-4 w-24" />
      </span>
      <small>
        TX: <Skeleton className="h-4 w-44" />
      </small>
    </div>
  );
}
