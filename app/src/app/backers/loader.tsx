import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../query-client";
import { BackersListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { getBackers } from "~/pages/api/backers";
import { getBacker } from "~/pages/api/backers/[accountId]";
import { getStats } from "~/pages/api/transactions/stats";
import { query } from "~/lib/constants/pagination";

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
