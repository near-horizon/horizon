import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../query-client";
import { RequestsListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { getRequests } from "~/pages/api/requests";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";
import { getStats } from "~/pages/api/transactions/stats";
import { query } from "~/lib/constants/pagination";

export async function RequestsListSectionLoader() {
  const queryClient = getQueryClient();
  const [requests, { requests: count }] = await Promise.all([
    getRequests(query),
    getStats(),
  ]);

  queryClient.setQueryData(["requests", query], requests);

  await Promise.all(
    requests.map(([projectId, cid]) =>
      queryClient.prefetchQuery({
        queryKey: ["request", projectId, cid],
        queryFn: async () => {
          const r = await getRequest(projectId, cid);
          return removeEmpty(r);
        },
      })
    )
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <RequestsListSection count={count} />
    </Hydrate>
  );
}
