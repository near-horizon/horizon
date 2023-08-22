import { QueryClient, dehydrate } from "@tanstack/react-query";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { Details } from "~/components/backer/details";
import { Header } from "~/components/backer/header";
import { ironSessionConfig } from "~/lib/constants/iron-session";
import { accountIdSchema, removeEmpty } from "~/lib/utils";
import { getBacker } from "../api/backers/[accountId]";

export default function Backer() {
  const { query } = useRouter();
  const accountId = accountIdSchema.parse(query.accountId);

  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-col gap-6">
        <Header accountId={accountId} />

        <div className="relative w-full">
          <Details accountId={accountId} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function({
  req,
  query,
}) {
  const user = req.session.user ?? null;
  const accountId = accountIdSchema.parse(query.accountId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["backer", accountId],
    queryFn: async () => {
      const c = await getBacker(accountId);
      return removeEmpty(c);
    },
  });

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
    },
  };
},
  ironSessionConfig);
