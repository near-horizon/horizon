import { ListPageLayout } from "~/app/list-page-layout";
import { ProjectSkeleton } from "../card";
import { pageSize } from "~/lib/constants/pagination";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ListPageLayout
      title="Projects"
      fallback={
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(pageSize).keys()].map((item) => (
            <li key={item}>
              <ProjectSkeleton />
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </ListPageLayout>
  );
}
