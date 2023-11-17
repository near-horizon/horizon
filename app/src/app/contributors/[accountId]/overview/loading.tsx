import { DescriptionSkeleton } from "~/components/description";
import { DetailSkeleton } from "~/components/detail";
import { Details } from "~/components/ui/details";

export default function ContributorOverviewLoading() {
  return (
    <Details
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <DetailSkeleton label="Website" />
              <DetailSkeleton label="Social links" />
              <DetailSkeleton label="Contributor type" />
              <DetailSkeleton label="Payment" />
              <DetailSkeleton label="Rate" />
              <DetailSkeleton label="Available for" />
              <DetailSkeleton label="Joined" />
              <DetailSkeleton label="Location" />
            </div>
          ),
        },
        {
          title: "About",
          id: "about",
          Content: <DescriptionSkeleton full />,
        },
        {
          title: "Skills and services",
          id: "skills",
          Content: <DescriptionSkeleton full />,
        },
      ]}
    />
  );
}
