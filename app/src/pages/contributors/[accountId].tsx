import { useRouter } from "next/router";
import { z } from "zod";
import { Contracts } from "~/components/contributor/contracts";
import { Header } from "~/components/contributor/header";
import { Details } from "~/components/contributor/details";
import { accountIdSchema, removeEmpty } from "~/lib/utils";
import { History } from "~/components/contributor/history";
import ContentTabs from "~/components/ui/content-tabs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getContributor } from "../api/contributors/[accountId]";
import { getContributorContracts } from "../api/contributors/[accountId]/contracts";
import { getContract } from "../api/contracts/[projectId]/[contributorId]/[cid]";
import { getContributorCompletedContracts } from "../api/contributors/[accountId]/contracts/completed";
import { withSSRSession } from "~/lib/auth";

export default function Contributor() {
  const { query } = useRouter();
  const accountId = accountIdSchema.parse(query.accountId);

  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-col gap-6">
        <Header accountId={accountId} />
        {/* <CTAs accountId={accountId} /> */}

        <ContentTabs
          tabs={[
            {
              text: "Overview",
              id: "overview",
              children: <Details accountId={accountId} />,
            },
            {
              text: "Contracts",
              id: "contracts",
              children: <Contracts accountId={accountId} />,
            },
            {
              text: "Work History",
              id: "history",
              children: <History accountId={accountId} />,
            },
          ]}
          tabRule={z
            .enum(["overview", "contracts", "history"])
            .default("overview")
            .catch("overview")}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function ({ query }) {
  const accountId = accountIdSchema.parse(query.accountId);

  const queryClient = new QueryClient();
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
