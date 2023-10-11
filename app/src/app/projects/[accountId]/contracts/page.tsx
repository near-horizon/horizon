import { Contracts } from "~/components/project/contracts";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectContracts({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Contracts accountId={accountId} />;
}
