import { ListPageLayout } from "~/app/list-page-layout";
import { ProjectSkeleton } from "../card";
import { pageSize } from "~/lib/constants/pagination";
import { Button } from "~/components/ui/button";
import { ChevronDownSvg } from "~/icons";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ListPageLayout
      title="Projects"
      fallback={
        <>
          <div className="flex w-full flex-row flex-wrap items-center justify-start gap-4">
            <Button variant="outline" className="group">
              Vertical
              <ChevronDownSvg
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
            <Button variant="outline" className="group">
              Stage
              <ChevronDownSvg
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
            <Button variant="outline" className="group">
              Distribution
              <ChevronDownSvg
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
            <Button variant="outline" className="group">
              Phase
              <ChevronDownSvg
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start gap-2">
              <b>0</b>
              <span className="whitespace-nowrap text-text-gray">projects</span>
            </div>
            {/* <SelectTrigger>Sort by</SelectTrigger> */}
          </div>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(pageSize).keys()].map((item) => (
              <li key={item}>
                <ProjectSkeleton />
              </li>
            ))}
          </ul>
        </>
      }
    >
      {children}
    </ListPageLayout>
  );
}
