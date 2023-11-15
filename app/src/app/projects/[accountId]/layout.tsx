import { dehydrate, Hydrate, type QueryClient } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import { Header } from "~/components/project/header";
import { CTAs } from "~/components/project/ctas";
import ContentTabs from "~/components/ui/content-tabs";
import { getUserFromSession } from "~/lib/session";
import { hasBacker } from "~/lib/client/backers";
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

  const isBacker = !!user && (await hasBacker(user.accountId));
  const backersDigest = await getBackersDigest(accountId);
  const isOwner = !!user && user.accountId === accountId;
  const isPublished = !!backersDigest.published;
  const list = headers();
  const referer = list.get("referer");

  const from = referer ? new URL(referer).searchParams.get("from") : null;
  // const hasToken = !!token && token === backersDigest.token;
  const isFromBackerView = !!from && from === backersViewFromKey;
  const hasPermission =
    isOwner ||
    (isPublished && (isBacker || /* hasToken || */ isFromBackerView));

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
