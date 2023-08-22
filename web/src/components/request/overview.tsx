import {
  formatTimestamp,
  type AccountId,
  formatBudget,
  type CID,
} from "~/lib/utils";
import { Description } from "../description";
import { Detail } from "../detail";
import { useRequest } from "~/lib/requests";
import { Tags } from "../tags";
import { formatDate } from "~/lib/utils";
import { format } from "timeago.js";

export function Overview({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const { data, status } = useRequest(accountId, cid);

  return (
    <div className="flex w-full flex-col divide-y">
      <section className="flex flex-col gap-2 py-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Detail
            label="Verticals"
            value={
              <Tags tags={data?.tags ?? {}} loading={status === "loading"} />
            }
            loading={status === "loading"}
          />
          <Detail
            label="Payment method"
            value={data?.source}
            loading={status === "loading"}
          />
          <Detail
            label="Service terms"
            value={data?.request_type}
            loading={status === "loading"}
          />
          <Detail
            label="Budget"
            value={formatBudget(data?.budget ?? 0)}
            loading={status === "loading"}
          />
          <Detail
            label="Created"
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
            label="Deadline"
            value={
              <span>
                {formatDate(data?.deadline ?? "")}
                <span>({format(data?.deadline ?? "", "en_US")})</span>
              </span>
            }
            loading={status === "loading"}
          />
        </div>
      </section>
      <Description
        text={data?.description ?? ""}
        loading={status === "loading"}
        full
      />
    </div>
  );
}
