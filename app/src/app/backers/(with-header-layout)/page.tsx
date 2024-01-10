import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { Backers } from "./backers";
import { getBacker, getBackers } from "~/lib/server/backers";

export default async function BackersPage() {
  const queryClient = new QueryClient();
  const backers = await getBackers({ limit: pageSize });

  queryClient.setQueryData(["backers-paginated"], {
    pages: [{ items: backers, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    backers.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["backer", accountId],
        queryFn: async () => {
          const c = await getBacker(accountId);
          return removeEmpty(c);
        },
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Backers />
    </HydrationBoundary>
  );
}
