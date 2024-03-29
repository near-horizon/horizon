"use client";

import Link from "next/link";
import { useStats } from "~/hooks/fetching";
import { Skeleton } from "./ui/skeleton";

export function MainStats() {
  const { data } = useStats();

  return (
    <div className="inline-grid w-fit grid-cols-2 items-center justify-center gap-3 md:grid-cols-4 md:justify-start">
      <Stat count={data?.projects ?? 0} label="Projects" href="/projects" />
      <Stat count={data?.requests ?? 0} label="Requests" href="/requests" />
      <Stat
        count={data?.contributors ?? 0}
        label="Contributors"
        href="/contributors"
      />
      <Stat count={data?.backers ?? 0} label="Backers" href="/backers" />
    </div>
  );
}

function Stat({
  count,
  label,
  href,
}: {
  count: number;
  label: string;
  href: string;
}) {
  return (
    <div className="flex w-32 flex-col items-center gap-2 md:items-start">
      <div className="text-xl font-bold">{count}</div>
      <Link className="text-blue-300" href={href}>
        {label}
      </Link>
    </div>
  );
}

function StatSkeleton({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex w-[6.5rem] flex-col gap-2">
      <div className="text-xl font-bold">
        <Skeleton className="h-5 w-16" />
      </div>
      <Link className="text-blue-300" href={href}>
        {label}
      </Link>
    </div>
  );
}

export function MainStatsSkeleton() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:justify-start">
      <StatSkeleton label="Projects" href="/projects" />
      <StatSkeleton label="Requests" href="/requests" />
      <StatSkeleton label="Contributors" href="/contributors" />
      <StatSkeleton label="Backers" href="/backers" />
    </div>
  );
}
