"use client";

import { Handle } from "~/components/handle";
import { ProjectIcon } from "~/components/project/icon";
import { Tags } from "~/components/tags";
import { Button } from "~/components/ui/button";
import { useProject } from "~/lib/projects";
import { useAccountId } from "~/stores/global";

export function ProfileHeader() {
  const accountId = useAccountId() ?? "";
  const { data } = useProject(accountId);

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-row items-start justify-start gap-6">
        <ProjectIcon
          accountId={accountId}
          loading={accountId === ""}
          className="h-24 w-24"
        />
        <div className="flex flex-col items-start justify-start gap-1">
          <Handle accountId={accountId} loading={accountId === ""} />
          <div className="truncate font-medium">{data?.tagline}</div>
          <Tags tags={data?.tags ?? {}} loading={accountId === ""} />
        </div>
      </div>
      <div className="flex flex-row items-start justify-end gap-4">
        <Button variant="outline">Edit</Button>
        <Button variant="outline">Share</Button>
      </div>
    </div>
  );
}
