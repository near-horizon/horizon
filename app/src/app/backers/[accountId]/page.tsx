import { Details } from "~/components/backer/details";
import { Header } from "~/components/backer/header";
import { getBackers } from "~/lib/server/backers";
import { type AccountId } from "~/lib/validation/common";

export default function BackersPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
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

export async function generateStaticParams() {
  const backerIds = await getBackers({});

  return backerIds.map((accountId) => ({ accountId }));
}