import { DescriptionSkeleton } from "~/components/description";
import { DetailSkeleton } from "~/components/detail";
import { Details } from "~/components/ui/details";

export default function BackerLoading() {
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
              <DetailSkeleton label="Specialization" />
              <DetailSkeleton label="Verticals" />
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
      ]}
    />
  );
}
