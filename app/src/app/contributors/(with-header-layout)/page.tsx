import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import { Contributors } from "./contributors";
import { getContributor, getContributors } from "~/lib/server/contributors";

export default async function ContributorsPage() {
  const queryClient = getQueryClient();
  const contributors = await getContributors({ limit: pageSize });

  queryClient.setQueryData(["contributors-paginated"], {
    pages: [{ items: contributors, next: 1 }],
    pageParams: [0],
  });

  await Promise.all([
    contributors.map((accountId) =>
      queryClient.prefetchQuery(["contributor", accountId], {
        queryFn: async () => {
          const c = await getContributor(accountId);
          return removeEmpty(c);
        },
      })
    ),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Contributors />
    </Hydrate>
  );
}
