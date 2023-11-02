import { dehydrate, Hydrate, type QueryClient } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { Header } from "~/components/project/header";
import { CTAs } from "~/components/project/ctas";
import ContentTabs from "~/components/ui/content-tabs";
import { getUserFromSession } from "~/lib/session";
import { hasBacker } from "~/lib/backers";
import {
  getBackersDigest,
  getProject,
  getRequestsForProject,
} from "~/lib/server/projects";
import { getRequest } from "~/lib/server/requests";
import { headers } from "next/headers";
import { backersViewFromKey } from "~/lib/constants/backers-digest";

export default async function ProjectPageLayout({
  params: { accountId },
  children,
}: {
  params: { accountId: string };
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();
  const queryClient = getQueryClient();
  await prefetch(accountId, queryClient);
  const isBacker = user?.accountId ? await hasBacker(user.accountId) : false;
  const backersDigest = user?.accountId
    ? await getBackersDigest(user.accountId)
    : {};
  const headersMap = headers();
  const referer = headersMap.get("referer");
  const isFromBackerView =
    !!referer &&
    new URL(referer).searchParams.get("from") === backersViewFromKey;
  const hasPermission =
    (isBacker || isFromBackerView || user?.accountId === accountId) &&
    backersDigest.published;

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-white px-8 py-6 shadow">
        <div className="flex w-full flex-col gap-6">
          <Header accountId={accountId} />
          <CTAs /* accountId={accountId} */ />
          <ContentTabs
            tabs={[
              ...(hasPermission
                ? [
                    {
                      id: "backers-digest",
                      text: "Backers Digest",
                      href: `/projects/${accountId}/backers-digest`,
                    },
                  ]
                : []),
              {
                id: "overview",
                text: "Overview",
                href: `/projects/${accountId}/overview`,
              },
              {
                id: "details",
                text: "Details",
                href: `/projects/${accountId}/details`,
              },
              {
                id: "requests",
                text: "Requests",
                href: `/projects/${accountId}/requests`,
              },
              {
                id: "contracts",
                text: "Contracts",
                href: `/projects/${accountId}/contracts`,
              },
              {
                id: "history",
                text: "Work History",
                href: `/projects/${accountId}/history`,
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
}
