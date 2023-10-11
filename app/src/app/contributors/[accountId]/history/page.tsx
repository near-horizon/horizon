import { History } from "~/components/contributor/history";
import { type AccountId } from "~/lib/validation/common";

export default function ContributorHistory({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <History accountId={accountId} />;
}
