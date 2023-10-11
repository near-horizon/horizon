"use client";

import { type AccountId } from "~/lib/validation/common";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import { Description } from "./description";
import Link from "next/link";
import { useBacker } from "~/hooks/backers";
import { Tags } from "./tags";

export function Backer({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useBacker(accountId);

  return (
    <div className="relative flex h-52 w-full flex-col gap-4 rounded-lg border border-gray-200 p-4 shadow">
      <Link className="h-20" href={`/backers/${accountId}`}>
        <h3 className="flex flex-row items-start justify-start gap-4">
          <div className="flex-shrink-0">
            <ProjectIcon
              accountId={accountId}
              loading={loading}
              className="h-16 w-16"
            />
          </div>
          <div>
            <Handle accountId={accountId} loading={loading} />
          </div>
        </h3>
        <span>{data?.specialization}</span>
      </Link>
      <div className="h-[4.5rem]">
        <Description
          text={data?.description ?? ""}
          loading={loading || status === "loading"}
        />
      </div>
      <div className="h-5">
        <Tags tags={data?.vertical ?? {}} loading={status === "loading"} />
      </div>
    </div>
  );
}
