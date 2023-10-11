import { ListPageLayout } from "../list-page-layout";

export default function BackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ListPageLayout title="Backers">{children}</ListPageLayout>;
}
