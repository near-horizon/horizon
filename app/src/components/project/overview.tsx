import { useProject } from "~/lib/projects";
import { formatTimestamp } from "~/lib/utils";
import { Requests } from "./requests";
import { Description } from "../description";
import { Detail } from "../detail";
import { Socials } from "../socials";
import { PointOfContact } from "../point-of-contact";
import { type AccountId } from "~/lib/validation/common";

export function Overview({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <div className="flex w-full flex-col divide-y">
      <section className="flex flex-col gap-2 py-8">
        <div>
          <h4 className="text-xl font-bold">Details</h4>
        </div>
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
      </section>
      <section className="py-8">
        <Requests accountId={accountId} />
      </section>
      {/* <section></section> */}
    </div>
  );
}
