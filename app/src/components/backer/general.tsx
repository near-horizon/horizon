"use client";

import { formatTimestamp } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { Detail } from "../detail";
import { Socials } from "../socials";
import { useBacker } from "~/hooks/backers";
import { Tags } from "../tags";

export function General({ accountId }: { accountId: AccountId }) {
  const { data, status } = useBacker(accountId);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Detail
        label="Website"
        value={
          <a href={`https://${data?.website}`} target="_blank">
            {data?.website ?? ""}
          </a>
        }
        loading={status === "loading"}
      />
      <Detail
        label="Social links"
        value={<Socials links={data?.linktree} />}
        loading={status === "loading"}
      />
      <Detail
        label="Specialization"
        value={data?.specialization ?? ""}
        loading={status === "loading"}
      />
      <Detail
        label="Verticals"
        value={
          <Tags tags={data?.vertical ?? {}} loading={status === "loading"} />
        }
        loading={status === "loading"}
      />
      <Detail
        label="Joined"
        value={
          <a
            href={`https://nearblocks.io/txns/${data?.creationTx?.hash}`}
            target="_blank"
            referrerPolicy="origin"
            className="text-blue-500 hover:underline"
          >
            {formatTimestamp(data?.creationTx?.timestamp)}
          </a>
        }
        loading={status === "loading"}
      />
      <Detail
        label="Location"
        value={data?.location ?? ""}
        loading={status === "loading"}
      />
    </div>
  );
}
