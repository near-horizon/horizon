import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ContributorsListSection } from "./list";
import { removeEmpty } from "~/lib/utils";
import { query } from "~/lib/constants/pagination";
import { getContributor, getContributors } from "~/lib/server/contributors";
import { getStats } from "~/lib/server/transactions";

export async function ContributorsListSectionLoader() {
  const queryClient = new QueryClient();
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContributorsListSection count={count} />
    </HydrationBoundary>
  );
}
