import { ListPageLayout } from "../list-page-layout";

export default function ContributorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ListPageLayout title="Contributors">{children}</ListPageLayout>;
}
