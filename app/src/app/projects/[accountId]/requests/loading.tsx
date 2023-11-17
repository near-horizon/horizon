import { RequestSkeleton } from "~/app/requests/card";

export default function ProjectRequestsLoading() {
  return (
    <>
      {[...Array(4).keys()].map((id) => (
        <div key={id} className="w-full">
          <RequestSkeleton />
        </div>
      ))}
    </>
  );
}
