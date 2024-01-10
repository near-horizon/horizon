import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { RequestsListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { query } from "~/lib/constants/pagination";
import { getRequest, getRequests } from "~/lib/server/requests";
import { getStats } from "~/lib/server/transactions";

export async function RequestsListSectionLoader() {
  const queryClient = new QueryClient();
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
      }),
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RequestsListSection count={count} />
    </HydrationBoundary>
  );
}
