import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import ContentTabs from "~/components/ui/content-tabs";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";
import { type Request } from "~/lib/validation/requests";
import { Availability } from "~/components/availability";
import { CTAs } from "~/components/request/ctas";
import { getUserFromSession } from "~/lib/session";

export default async function RequestPageLayout({
  params: { accountId, cid },
  children,
}: {
  params: { accountId: string; cid: string };
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();
  const isAdmin = !!user && user.accountId === accountId;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["request", accountId, cid],
    queryFn: async () => {
      const r = await getRequest(accountId, cid);
      return removeEmpty(r);
    },
  });

  const data = queryClient.getQueryData<Request>(["request", accountId, cid]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="flex w-full flex-row">
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-2xl font-bold leading-9">
            {!data ? (
              <b className="block h-4 w-28 animate-pulse bg-gray-200" />
            ) : (
              data.title
            )}
          </h1>
          <Availability
            available={data?.open}
            availableText="Receiving proposals"
            unavailableText="Closed"
          />
          <CTAs accountId={accountId} cid={cid} />
          {isAdmin && (
            <ContentTabs
              tabs={[
                {
                  id: "overview",
                  text: "Overview",
                  href: `/requests/${accountId}/${cid}/overview`,
                },
                {
                  id: "proposals",
                  text: "Proposals",
                  href: `/requests/${accountId}/${cid}/proposals`,
                },
              ]}
            />
          )}
          {children}
        </div>
      </div>
    </Hydrate>
  );
}
