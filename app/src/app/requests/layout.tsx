import { ListPageLayout } from "../list-page-layout";

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ListPageLayout title="Requests">{children}</ListPageLayout>;
}
