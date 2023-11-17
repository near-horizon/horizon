import { ContractSkeleton } from "~/app/contracts/card";

export default function ProjectContractsLoading() {
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
