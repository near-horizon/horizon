import { type AccountId } from "~/lib/validation/common";
import { General } from "./general";
import { Description } from "../description";
import { useContributor } from "~/lib/contributors";
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
        {
          title: "Skills and services",
          id: "skills",
          Content: <Skills accountId={accountId} />,
        },
      ]}
    />
  );
}

function DescriptionArea({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

  return (
    <Description
      text={data?.description ?? ""}
      loading={status === "loading"}
      full
    />
  );
}

function Skills({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

  return (
    <Description
      text={data?.services ?? ""}
      loading={status === "loading"}
      full
    />
  );
}
