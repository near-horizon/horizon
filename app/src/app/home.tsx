import { MainStatsSkeleton } from "~/components/main-stats";
import { ProjectsListSectionLoader } from "./projects/loader";
import { Suspense } from "react";
import { ProjectsListSectionSkeleton } from "./projects/list";
import { ContributorsListSectionSkeleton } from "./contributors/list";
import { ContributorsListSectionLoader } from "./contributors/loader";
import { BackersListSectionSkeleton } from "./backers/list";
import { BackersListSectionLoader } from "./backers/loader";
import { RequestsListSectionSkeleton } from "./requests/list";
import { RequestsListSectionLoader } from "./requests/loader";
import { StatsLoader } from "./stats-loader";

export function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<MainStatsSkeleton />}>
        <StatsLoader />
      </Suspense>
      <Suspense fallback={<ProjectsListSectionSkeleton />}>
        <ProjectsListSectionLoader />
      </Suspense>
      <Suspense fallback={<RequestsListSectionSkeleton />}>
        <RequestsListSectionLoader />
      </Suspense>
      <Suspense fallback={<ContributorsListSectionSkeleton />}>
        <ContributorsListSectionLoader />
      </Suspense>
      <Suspense fallback={<BackersListSectionSkeleton />}>
        <BackersListSectionLoader />
      </Suspense>
    </div>
  );
}
