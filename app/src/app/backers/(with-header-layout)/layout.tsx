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
        <ul className="flex flex-row flex-wrap items-stretch justify-start gap-2">
          {[...Array(pageSize).keys()].map((item) => (
            <li
              key={item}
              className="w-full md:w-[calc((100%-.5rem)*.5)] lg:w-[calc((100%-1rem)*.33)] 2xl:w-[calc((100%-1.5rem)*.25)]"
            >
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
