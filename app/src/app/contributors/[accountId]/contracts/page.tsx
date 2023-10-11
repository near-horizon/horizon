import { Contracts } from "~/components/contributor/contracts";
import { type AccountId } from "~/lib/validation/common";

export default function ContributorContracts({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Contracts accountId={accountId} />;
}
