import { Details } from "~/components/ui/details";
import { DescriptionSkeleton } from "~/components/description";

export default function ContractFeedbackLoading() {
  return (
    <Details
      sections={[
        {
          id: "project",
          title: "Project feedback",
          Content: <DescriptionSkeleton />,
        },
        {
          id: "contributor",
          title: "Contributor feedback",
          Content: <DescriptionSkeleton />,
        },
      ]}
    />
  );
}
