import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../query-client";
import { ContributorsListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { getContributors } from "~/pages/api/contributors";
import { getContributor } from "~/pages/api/contributors/[accountId]";
import { getStats } from "~/pages/api/transactions/stats";
import { query } from "~/lib/constants/pagination";

export async function ContributorsListSectionLoader() {
  const queryClient = getQueryClient();
  const [contributors, { contributors: count }] = await Promise.all([
    getContributors(query),
    getStats(),
  ]);

  queryClient.setQueryData(["contributors", query], contributors);

  await Promise.all(
    contributors.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["contributor", accountId],
        queryFn: async () => {
          const c = await getContributor(accountId);
          return removeEmpty(c);
        },
      })
    )
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <ContributorsListSection count={count} />
    </Hydrate>
  );
}
