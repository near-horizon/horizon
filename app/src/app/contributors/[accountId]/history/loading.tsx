import { ContractSkeleton } from "~/app/contracts/card";

export default function ContributorHistoryLoading() {
  return (
    <>
      {[...Array(4).keys()].map((id) => (
        <div key={id}>
          <ContractSkeleton />
        </div>
      ))}
    </>
  );
}
