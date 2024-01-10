import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { Requests } from "./requests";
import { getRequest, getRequests } from "~/lib/server/requests";

export default async function RequestsPage() {
  const queryClient = new QueryClient();
  const requests = await getRequests({ limit: pageSize });

  queryClient.setQueryData(["requests-paginated"], {
    pages: [{ items: requests, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    requests.map(([accountId, cid]) =>
      queryClient.prefetchQuery({
        queryKey: ["request", accountId, cid],
        queryFn: async () => {
          const r = await getRequest(accountId, cid);
          return removeEmpty(r);
        },
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Requests />
    </HydrationBoundary>
  );
}
