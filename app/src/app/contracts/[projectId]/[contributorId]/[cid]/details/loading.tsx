import { DescriptionSkeleton } from "~/components/description";
import { DetailSkeleton } from "~/components/detail";
import { Details } from "~/components/ui/details";

export default function DetailsLoading() {
  return (
    <Details
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DetailSkeleton label="Contributor" />
              <DetailSkeleton label="Project" />
              <DetailSkeleton label="Price" />
              <DetailSkeleton label="Payment method" />
              <DetailSkeleton label="Payment type" />
              <DetailSkeleton label="Request type" />
              <DetailSkeleton label="Deadline" />
            </div>
          ),
        },
        {
          title: "Description",
          id: "description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">Message from</h2>
              <DescriptionSkeleton full />
            </>
          ),
        },
        {
          title: "Request description",
          id: "request-description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">Description by</h2>
              <DescriptionSkeleton full />
            </>
          ),
        },
      ]}
    />
  );
}
