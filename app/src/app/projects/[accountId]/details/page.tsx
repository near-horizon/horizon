import { Details } from "~/components/project/details";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectDetails({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Details accountId={accountId} />;
}
