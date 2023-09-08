import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { Availability } from "~/components/availability";
import { CTAs } from "~/components/request/ctas";
import { Overview } from "~/components/request/overview";
import { Proposals } from "~/components/request/proposals";
import ContentTabs from "~/components/ui/content-tabs";
import { withSSRSession } from "~/lib/auth";
import { useRequest } from "~/lib/requests";
import { removeEmpty } from "~/lib/utils";
import { accountIdSchema, cidSchema } from "~/lib/validation/common";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";
import { useUser } from "~/stores/global";

export default function Request() {
  const router = useRouter();
  const accountId = accountIdSchema.parse(router.query.accountId);
  const cid = cidSchema.parse(router.query.cid);
  const { data, status } = useRequest(accountId, cid);
  const user = useUser();
  const isAdmin = !!user && user.accountId === accountId;

  const content = isAdmin ? (
    <ContentTabs
      tabs={[
        {
          id: "overview",
          text: "Overview",
          children: <Overview accountId={accountId} cid={cid} />,
        },
        {
          id: "proposals",
          text: "Proposals",
          children: <Proposals accountId={accountId} cid={cid} />,
        },
        { id: "invites", text: "Invites", children: "Your invites here" },
      ]}
      tabRule={z
        .enum(["overview", "proposals", "invites"])
        .default("overview")
        .catch("overview")}
    />
  ) : (
    <Overview accountId={accountId} cid={cid} />
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold leading-9">
        {status === "loading" ? (
          <b className="block h-4 w-28 animate-pulse bg-gray-200" />
        ) : (
          data?.title
        )}
      </h1>
      <Availability
        available={data?.open}
        availableText="Receiving proposals"
        unavailableText="Closed"
      />
      <CTAs accountId={accountId} cid={cid} />
      {content}
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function({ query }) {
  const queryClient = new QueryClient();
  const accountId = accountIdSchema.parse(query.accountId as string);
  const cid = z.string().parse(query.cid as string);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["request", accountId, cid],
      queryFn: async () => {
        const r = await getRequest(accountId, cid);
        return removeEmpty(r);
      },
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
