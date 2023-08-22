import { useProjectCompletedContracts } from "~/lib/contracts";
import { type AccountId } from "~/lib/utils";
import { Contract } from "../contract";

export function History({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectCompletedContracts(accountId);

  return (
    <div className="flex flex-col gap-3">
      {status === "loading"
        ? "Loading..."
        : data?.map((contractId) => (
          <div key={contractId.toString()}>
            <Contract contractId={contractId} showContributor />
          </div>
        ))}
    </div>
  );
}
