import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Socials } from "~/components/socials";
import { Tags } from "~/components/tags";
import { Details } from "~/components/ui/details";
import { getContributor } from "~/lib/server/contributors";
import { formatTimestamp } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";

export default async function ContributorOverview({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const contributor = await getContributor(accountId);

  return (
    <Details
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Detail label="Website">
                <a href={`https://${contributor?.website}`} target="_blank">
                  {contributor?.website ?? ""}
                </a>
              </Detail>
              <Detail label="Social links">
                <Socials links={contributor?.linktree ?? {}} />
              </Detail>
              <Detail label="Contributor type">
                {contributor?.vendor_type ?? ""}
              </Detail>
              <Detail label="Payment">
                <Tags tags={contributor?.payments ?? {}} />
              </Detail>
              <Detail label="Rate">{contributor?.rate ?? ""}</Detail>
              <Detail label="Available for">
                <Tags tags={contributor?.work ?? {}} />
              </Detail>
              <Detail label="Joined">
                <a
                  href={`https://nearblocks.io/txns/${contributor?.creationTx?.hash}`}
                  target="_blank"
                  referrerPolicy="origin"
                  className="text-blue-500 hover:underline"
                >
                  {formatTimestamp(contributor?.creationTx?.timestamp)}
                </a>
              </Detail>
              <Detail label="Location">{contributor?.location ?? ""}</Detail>
            </div>
          ),
        },
        {
          title: "About",
          id: "about",
          Content: <Description text={contributor?.description ?? ""} full />,
        },
        {
          title: "Skills and services",
          id: "skills",
          Content: <Description text={contributor?.services ?? ""} full />,
        },
      ]}
    />
  );
}
