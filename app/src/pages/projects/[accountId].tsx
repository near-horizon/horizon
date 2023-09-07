import { useRouter } from "next/router";
import { z } from "zod";
import { History } from "~/components/project/history";
import { CTAs } from "~/components/project/ctas";
import { Details } from "~/components/project/details";
import { Header } from "~/components/project/header";
import { Overview } from "~/components/project/overview";
import { accountIdSchema, removeEmpty } from "~/lib/utils";
import { Requests } from "~/components/project/requests-tab";
import { Contracts } from "~/components/project/contracts";
import ContentTabs from "~/components/ui/content-tabs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getProject } from "../api/projects/[accountId]";
import { getRequestsForProject } from "../api/projects/[accountId]/requests";
import { getRequest } from "../api/requests/[accountId]/[cid]";
import { withSSRSession } from "~/lib/auth";

export default function Project() {
  const { query } = useRouter();
  const accountId = accountIdSchema.parse(query.accountId);

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-col gap-6">
        <Header accountId={accountId} />
        <CTAs /* accountId={accountId} */ />

        <ContentTabs
          tabs={[
            {
              id: "overview",
              text: "Overview",
              children: <Overview accountId={accountId} />,
            },
            {
              id: "details",
              text: "Details",
              children: <Details accountId={accountId} />,
            },
            {
              id: "requests",
              text: "Requests",
              children: <Requests accountId={accountId} />,
            },
            {
              id: "contracts",
              text: "Contracts",
              children: <Contracts accountId={accountId} />,
            },
            {
              id: "history",
              text: "Work History",
              children: <History accountId={accountId} />,
            },
          ]}
          tabRule={z
            .enum(["overview", "details", "requests", "contracts", "history"])
            .default("overview")
            .catch("overview")}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function({ query }) {
  const accountId = accountIdSchema.parse(query.accountId);

  const queryClient = new QueryClient();
  const requests = await getRequestsForProject(accountId);

  queryClient.setQueryData(["requests", accountId], requests);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["account", accountId],
      queryFn: async () => {
        const p = await getProject(accountId);
        return removeEmpty(p);
      },
    }),
    ...requests.map(([_, cid]) =>
      queryClient.prefetchQuery({
        queryKey: ["request", accountId, cid],
        queryFn: async () => {
          const r = await getRequest(accountId, cid);
          return removeEmpty(r);
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
