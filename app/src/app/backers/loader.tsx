import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../query-client";
import { BackersListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { query } from "~/lib/constants/pagination";
import { getBacker, getBackers } from "~/lib/server/backers";
import { getStats } from "~/lib/server/transactions";

export async function BackersListSectionLoader() {
  const queryClient = getQueryClient();
  const [backers, { backers: count }] = await Promise.all([
    getBackers(query),
    getStats(),
  ]);

  queryClient.setQueryData(["backers", query], backers);

  await Promise.all(
    backers.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["backer", accountId],
        queryFn: async () => {
          const b = await getBacker(accountId);
          return removeEmpty(b);
        },
      })
    )
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <BackersListSection count={count} />
    </Hydrate>
  );
}
