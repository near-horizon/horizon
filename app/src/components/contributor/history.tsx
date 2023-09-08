import { useContributorCompletedContracts } from "~/lib/contracts";
import { type AccountId } from "~/lib/validation/common";
import { Contract } from "../contract";

export function History({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributorCompletedContracts(accountId);

  return (
    <div className="flex flex-col gap-3">
      {status === "loading"
        ? "Loading..."
        : data?.map((contractId) => (
          <div key={contractId.toString()}>
            <Contract contractId={contractId} showContributor={false} />
          </div>
        ))}
    </div>
  );
}
