"use client";

import { type AccountId } from "~/lib/validation/common";
import { Icon } from "../icon";
import { Handle } from "../handle";
import { useProject } from "~/hooks/projects";
import { Tags } from "../tags";

export function Header({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Icon name={data?.name ?? ""} image={data?.image} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle accountId={accountId} />

        {status === "loading" ? (
          <b className="block h-5 w-40 animate-pulse bg-gray-400" />
        ) : (
          <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
            {data?.tagline}
          </p>
        )}

        <Tags tags={data?.product_type ?? {}} loading={status === "loading"} />
      </div>
    </div>
  );
}
