import { useProject } from "~/hooks/projects";
import { formatTimestamp } from "~/lib/utils";
import { Description } from "../description";
import { Detail } from "../detail";
import { PointOfContact } from "../point-of-contact";
import { Socials } from "../socials";
import { type AccountId } from "~/lib/validation/common";

export function General({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <>
      <Description
        text={data?.description ?? ""}
        loading={status === "loading"}
        full
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <Detail
          label="Company size"
          value={data?.company_size ?? ""}
          loading={status === "loading"}
        />
        <Detail
          label="Point of contact"
          value={<PointOfContact telegram={data?.linktree?.telegram} />}
          loading={status === "loading"}
        />
        <Detail
          label="Social links"
          value={<Socials links={data?.linktree} />}
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
          value={data?.geo ?? ""}
          loading={status === "loading"}
        />
        <Detail
          label="Website"
          value={
            <a href={`https://${data?.website}`} target="_blank">
              {data?.website ?? ""}
            </a>
          }
          loading={status === "loading"}
        />
      </div>
    </>
  );
}
