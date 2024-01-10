import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { Contributors } from "./contributors";
import { getContributor, getContributors } from "~/lib/server/contributors";

export default async function ContributorsPage() {
  const queryClient = new QueryClient();
  const contributors = await getContributors({ limit: pageSize });

  queryClient.setQueryData(["contributors-paginated"], {
    pages: [{ items: contributors, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    contributors.map((accountId) =>
      queryClient.prefetchQuery({
        queryKey: ["contributor", accountId],
        queryFn: async () => {
          const c = await getContributor(accountId);
          return removeEmpty(c);
        },
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Contributors />
    </HydrationBoundary>
  );
}
