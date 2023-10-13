import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { Backers } from "./backers";
import { getBacker, getBackers } from "~/lib/server/backers";

export default async function BackersPage() {
  const queryClient = getQueryClient();
  const backers = await getBackers({ limit: pageSize });

  queryClient.setQueryData(["backers-paginated"], {
    pages: [{ items: backers, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    backers.map((accountId) =>
      queryClient.prefetchQuery(["backer", accountId], {
        queryFn: async () => {
          const c = await getBacker(accountId);
          return removeEmpty(c);
        },
      })
    ),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Backers />
    </Hydrate>
  );
}
