"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useContributorCompletion } from "~/hooks/contributors";
import { useProjectCompletion } from "~/hooks/projects";
import { NUMBER } from "~/lib/format";
import { useUser } from "~/stores/global";

export function ProjectBadge({
  metric,
}: {
  metric: "basic" | "tech" | "funding" | "founders" | "files";
}) {
  const user = useUser();
  const { data, status } = useProjectCompletion(
    user.logedIn ? user.accountId : undefined,
  );

  if (status === "pending") {
    return <Skeleton className="h-3 w-3 rounded-full" />;
  }

  if (status === "error" || !user.logedIn) {
    return "?%";
  }

  return NUMBER.percentage(data[metric]);
}

export function ContributorBadge({
  metric,
}: {
  metric: "basic" | "portfolio";
}) {
  const user = useUser();
  const { data, status } = useContributorCompletion(
    user.logedIn ? user.accountId : undefined,
  );

  if (status === "pending") {
    return <Skeleton className="h-3 w-3 rounded-full" />;
  }

  if (status === "error" || !user.logedIn) {
    return "?%";
  }

  return NUMBER.percentage(data[metric]);
}
