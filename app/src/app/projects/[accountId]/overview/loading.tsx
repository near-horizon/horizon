import { DescriptionSkeleton } from "~/components/description";
import { DetailSkeleton } from "~/components/detail";
import { Details } from "~/components/ui/details";
import { RequestsSkeleton } from "./requests";

export default function OverviewLoading() {
  return (
    <Details
      sections={[
        {
          id: "details",
          title: "Details",
          Content: (
            <>
              <DescriptionSkeleton full />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <DetailSkeleton label="Company size" />
                <DetailSkeleton label="Social links" />
                <DetailSkeleton label="Joined" />
                <DetailSkeleton label="Location" />
                <DetailSkeleton label="Website" />
              </div>
            </>
          ),
        },
        {
          id: "requests",
          title: "Requests",
          Content: <RequestsSkeleton />,
        },
      ]}
    />
  );
}
