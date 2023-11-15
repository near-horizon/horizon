import { useProjectRequests } from "~/hooks/requests";
import { type AccountId } from "~/lib/validation/common";
import { Request, RequestSkeleton } from "~/app/requests/card";
import { NoData } from "../empty";

export function Requests({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectRequests(accountId);

  return (
    <div className="flex max-w-[100dvw] flex-col gap-4 overflow-hidden">
      <h4 className="text-xl font-bold">Requests</h4>
      {status === "loading" ? (
        <div className="grid w-full max-w-full grid-cols-1 gap-8 overflow-x-scroll md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <RequestSkeleton />
          <RequestSkeleton />
          <RequestSkeleton />
          <RequestSkeleton />
        </div>
      ) : !!data?.length ? (
        <div className="grid w-full max-w-full grid-cols-1 gap-8 overflow-x-scroll md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data.map(([, cid]) => (
            <div
              key={cid}
              className="md:[&:nth-child(n+7)]:hidden 2xl:[&:nth-child(n+7)]:block"
            >
              <Request accountId={accountId} cid={cid} />
            </div>
          ))}
        </div>
      ) : (
        <NoData
          description="It looks like this project hasn't created any requests yet"
          className="h-48"
        />
      )}
    </div>
  );
}
