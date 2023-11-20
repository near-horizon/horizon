import { Description } from "~/components/description";
import { Details } from "~/components/ui/details";
import { Detail } from "~/components/detail";
import { getBacker, getBackers } from "~/lib/server/backers";
import { type AccountId } from "~/lib/validation/common";
import { Socials } from "~/components/socials";
import { Tags } from "~/components/tags";
import { DATE } from "~/lib/format";

export default async function BackersPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const backer = await getBacker(accountId);

  return (
    <Details
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Detail label="Website">
                <a href={`https://${backer.website}`} target="_blank">
                  {backer.website ?? ""}
                </a>
              </Detail>
              <Detail label="Social links">
                <Socials links={backer.linktree ?? {}} />
              </Detail>
              <Detail label="Specialization">
                {backer.specialization ?? ""}
              </Detail>
              <Detail label="Verticals">
                <Tags tags={backer.vertical ?? {}} />
              </Detail>
              <Detail label="Joined">
                <a
                  href={`https://nearblocks.io/txns/${backer.creationTx?.hash}`}
                  target="_blank"
                  referrerPolicy="origin"
                  className="text-blue-500 hover:underline"
                >
                  {DATE.timestamp(backer.creationTx?.timestamp)}
                </a>
              </Detail>
              <Detail label="Location">{backer.location ?? ""}</Detail>
            </div>
          ),
        },
        {
          title: "About",
          id: "about",
          Content: <Description text={backer.description ?? ""} full />,
        },
      ]}
    />
  );
}

export async function generateStaticParams() {
  const backerIds = await getBackers({});

  return backerIds.map((accountId) => ({ accountId }));
}
