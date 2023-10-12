import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { getRequests } from "~/pages/api/requests";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";
import { Requests } from "./requests";

export default async function RequestsPage() {
  const queryClient = getQueryClient();
  const requests = await getRequests({ limit: pageSize });

  queryClient.setQueryData(["requests-paginated"], {
    pages: [{ items: requests, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    requests.map(([accountId, cid]) =>
      queryClient.prefetchQuery(["request", accountId, cid], {
        queryFn: async () => {
          const r = await getRequest(accountId, cid);
          return removeEmpty(r);
        },
      })
    ),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Requests />
    </Hydrate>
  );
}
