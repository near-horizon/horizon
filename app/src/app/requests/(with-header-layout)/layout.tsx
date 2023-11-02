import { ListPageLayout } from "~/app/list-page-layout";
import { RequestSkeleton } from "../card";
import { pageSize } from "~/lib/constants/pagination";

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ListPageLayout
      title="Requests"
      fallback={
        <ul className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(pageSize).keys()].map((item) => (
            <li key={item}>
              <RequestSkeleton />
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </ListPageLayout>
  );
}
