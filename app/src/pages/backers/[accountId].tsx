import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Details } from "~/components/backer/details";
import { Header } from "~/components/backer/header";
import { removeEmpty } from "~/lib/utils";
import { getBacker } from "../api/backers/[accountId]";
import { withSSRSession } from "~/lib/auth";
import { accountIdSchema } from "~/lib/validation/common";

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

export const getServerSideProps = withSSRSession(async function ({ query }) {
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
      dehydratedState: dehydrate(queryClient),
    },
  };
});
