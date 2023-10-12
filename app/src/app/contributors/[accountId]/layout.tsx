import { Hydrate, type QueryClient, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { Header } from "~/components/contributor/header";
import ContentTabs from "~/components/ui/content-tabs";
import { getContributorContracts } from "~/pages/api/contributors/[accountId]/contracts";
import { getContributor } from "~/pages/api/contributors/[accountId]";
import { getContributorCompletedContracts } from "~/pages/api/contributors/[accountId]/contracts/completed";
import { getContract } from "~/pages/api/contracts/[projectId]/[contributorId]/[cid]";

export default async function ContributorPageLayout({
  params: { accountId },
  children,
}: {
  params: { accountId: string };
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await prefetch(accountId, queryClient);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="flex w-full flex-row">
        <div className="flex w-full flex-col gap-6">
          <Header accountId={accountId} />
          <ContentTabs
            tabs={[
              {
                id: "overview",
                text: "Overview",
                href: `/contributors/${accountId}/overview`,
              },
              {
                id: "contracts",
                text: "Contracts",
                href: `/contributors/${accountId}/contracts`,
              },
              {
                id: "history",
                text: "Work History",
                href: `/contributors/${accountId}/history`,
              },
            ]}
          />
          {children}
        </div>
      </div>
    </Hydrate>
  );
}

async function prefetch(accountId: string, queryClient: QueryClient) {
  const contracts = await getContributorContracts(accountId);

  queryClient.setQueryData(["contracts", "contributor", accountId], contracts);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["contributor", accountId],
      queryFn: async () => {
        const c = await getContributor(accountId);
        return removeEmpty(c);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["contracts", "contributor", accountId, "completed"],
      queryFn: async () => {
        const c = await getContributorCompletedContracts(accountId);
        return removeEmpty(c);
      },
    }),
    ...contracts.map((contractId) =>
      queryClient.prefetchQuery({
        queryKey: ["contract", contractId],
        queryFn: async () => {
          const c = await getContract(contractId);
          return removeEmpty(c);
        },
      })
    ),
  ]);
}
