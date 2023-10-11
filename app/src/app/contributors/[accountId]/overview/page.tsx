import { Details } from "~/components/contributor/details";
import { type AccountId } from "~/lib/validation/common";

export default function ContributorOverview({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Details accountId={accountId} />;
}
