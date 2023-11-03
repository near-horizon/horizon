"use client";

import { formatTimestamp } from "~/lib/utils";
import { Detail } from "../detail";
import { Socials } from "../socials";
import { Tags } from "../tags";
import { useContributor } from "~/hooks/contributors";
import { type AccountId } from "~/lib/validation/common";

export function General({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

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
        value={<Socials links={data?.linktree ?? {}} />}
        loading={status === "loading"}
      />
      <Detail
        label="Contributor type"
        value={data?.vendor_type ?? ""}
        loading={status === "loading"}
      />
      <Detail
        label="Payment"
        value={
          <Tags tags={data?.payments ?? {}} loading={status === "loading"} />
        }
        loading={status === "loading"}
      />
      <Detail
        label="Rate"
        value={data?.rate ?? ""}
        loading={status === "loading"}
      />
      <Detail
        label="Available for"
        value={<Tags tags={data?.work ?? {}} loading={status === "loading"} />}
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
