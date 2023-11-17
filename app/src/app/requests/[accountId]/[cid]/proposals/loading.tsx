import { ProposalSkeleton } from "~/app/proposals/card";

export default function ProposalsLoading() {
  return (
    <div>
      {[...Array(4).keys()].map((id) => (
        <div key={id}>
          <ProposalSkeleton />
        </div>
      ))}
    </div>
  );
}
