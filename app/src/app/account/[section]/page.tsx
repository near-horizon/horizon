import GrowthPrograms from "./growth";
export default function ProfileSection({
  params: { section },
}: {
  params: { section: string };
}) {
  switch (section) {
    case "growth":
      return <GrowthPrograms />;
    default:
      return section;
  }
}
