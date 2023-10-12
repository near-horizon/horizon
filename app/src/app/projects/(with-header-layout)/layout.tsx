import { ListPageLayout } from "~/app/list-page-layout";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ListPageLayout title="Projects">{children}</ListPageLayout>;
}
