import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Tags } from "~/components/tags";
import { getRequest } from "~/lib/server/requests";
import { type AccountId, type CID } from "~/lib/validation/common";
import { DATE, NUMBER } from "~/lib/format";

export default async function RequestOverview({
  params: { accountId, cid },
}: {
  params: { accountId: AccountId; cid: CID };
}) {
  const request = await getRequest(accountId, cid);

  return (
    <div className="flex w-full flex-col divide-y">
      <section className="flex flex-col gap-2 py-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Detail label="Verticals">
            <Tags tags={request.tags} />
          </Detail>
          <Detail label="Payment method">{request.source}</Detail>
          <Detail label="Service terms">{request.request_type}</Detail>
          <Detail label="Budget">{NUMBER.compact(request.budget)}</Detail>
          <Detail label="Created">
            <a
              href={`https://nearblocks.io/txns/${request.creationTx?.hash}`}
              target="_blank"
              referrerPolicy="origin"
              className="text-blue-500 hover:underline"
            >
              {DATE.timestamp(request.creationTx?.timestamp)}
            </a>
          </Detail>
          <Detail label="Deadline">
            <span>
              {DATE.date(request.deadline)}{" "}
              <span>({DATE.timeago(request.deadline)})</span>
            </span>
          </Detail>
        </div>
      </section>
      <Description text={request.description} full />
    </div>
  );
}
