import { ListPageLayout } from "~/app/list-page-layout";
import { BackerSkeleton } from "../card";
import { pageSize } from "~/lib/constants/pagination";

export default function BackersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ListPageLayout
      title="Backers"
      fallback={
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(pageSize).keys()].map((item) => (
            <li key={item}>
              <BackerSkeleton />
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </ListPageLayout>
  );
}
