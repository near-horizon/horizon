import { useProjectContracts } from "~/lib/contracts";
import { type AccountId } from "~/lib/validation/common";
import { Contract } from "../contract";

export function Contracts({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectContracts(accountId);

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
