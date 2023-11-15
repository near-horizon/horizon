import { General } from "~/components/backer/general";
import { Header } from "~/components/backer/header";
import { Description } from "~/components/description";
import { Details } from "~/components/ui/details";
import { getBackers } from "~/lib/server/backers";
import { type AccountId } from "~/lib/validation/common";

export default function BackersPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return (
    <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <div className="flex w-full flex-col gap-6">
        <Header accountId={accountId} />

        <div className="relative w-full">
          <Details
            sections={[
              {
                title: "Details",
                id: "details",
                Content: <General accountId={accountId} />,
              },
              {
                title: "About",
                id: "about",
                Content: <Description text={""} loading={false} full />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const backerIds = await getBackers({});

  return backerIds.map((accountId) => ({ accountId }));
}
