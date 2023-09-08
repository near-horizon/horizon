import { type AccountId } from "~/lib/validation/common";
import { General } from "./general";
import { useBacker } from "~/lib/backers";
import { Description } from "../description";
import { Details as UIDetails } from "~/components/ui/details";

export function Details({ accountId }: { accountId: AccountId }) {
  return (
    <UIDetails
      sections={[
        {
          title: "Details",
          id: "details",
          Content: <General accountId={accountId} />,
        },
        {
          title: "About",
          id: "about",
          Content: <DescriptionArea accountId={accountId} />,
        },
      ]}
    />
  );
}

function DescriptionArea({ accountId }: { accountId: AccountId }) {
  const { data, status } = useBacker(accountId);

  return (
    <Description
      text={data?.description ?? ""}
      loading={status === "loading"}
      full
    />
  );
}
