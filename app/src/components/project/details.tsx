import { type AccountId } from "~/lib/validation/common";
import { General } from "./general";
import { Questions } from "./questions";
import { Tech } from "./tech";
import { Documents } from "./documents";
import { Funding } from "./funding";
import { Stats } from "./stats";
import { Founders } from "./founders";
import { Details as UIDetails } from "~/components/ui/details";

export function Details({ accountId }: { accountId: AccountId }) {
  return (
    <UIDetails
      links
      sections={[
        {
          title: "About",
          id: "about",
          Content: <General accountId={accountId} />,
        },
        {
          title: "Stats",
          id: "stats",
          Content: <Stats accountId={accountId} />,
        },
        { title: "Tech", id: "tech", Content: <Tech accountId={accountId} /> },
        {
          title: "Funding",
          id: "funding",
          Content: <Funding accountId={accountId} />,
        },
        {
          title: "Documents",
          id: "documents",
          Content: <Documents accountId={accountId} />,
        },
        {
          title: "Founders",
          id: "founders",
          Content: <Founders accountId={accountId} />,
        },
        {
          title: "Details",
          id: "details",
          Content: <Questions accountId={accountId} />,
        },
      ]}
    />
  );
}
