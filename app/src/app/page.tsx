import {
  MainStats,
  // MainStatsSkeleton,
} from "~/components/main-stats";
// import { ProjectsListSectionLoader } from "./projects/loader";
// import { Suspense } from "react";
import {
  ProjectsListSection,
  // ProjectsListSectionSkeleton,
} from "./projects/list";
import {
  ContributorsListSection,
  // ContributorsListSectionSkeleton,
} from "./contributors/list";
// import { ContributorsListSectionLoader } from "./contributors/loader";
import {
  BackersListSection,
  // BackersListSectionSkeleton,
} from "./backers/list";
// import { BackersListSectionLoader } from "./backers/loader";
import {
  RequestsListSection,
  // RequestsListSectionSkeleton,
} from "./requests/list";
// import { RequestsListSectionLoader } from "./requests/loader";
// import { StatsLoader } from "./stats-loader";
import { getStats } from "~/lib/server/transactions";

export default async function Home() {
  const { projects, requests, contributors, backers } = await getStats();
  return (
    <div className="flex flex-col items-center gap-8 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <h1 className="w-full text-3xl font-semibold">Explore NEAR Horizon</h1>
      <div className="flex w-full flex-col gap-8">
        {/* <Suspense fallback={<MainStatsSkeleton />}> */}
        {/*   <StatsLoader /> */}
        {/* </Suspense> */}
        {/* <Suspense fallback={<ProjectsListSectionSkeleton />}> */}
        {/*   <ProjectsListSectionLoader /> */}
        {/* </Suspense> */}
        {/* <Suspense fallback={<RequestsListSectionSkeleton />}> */}
        {/*   <RequestsListSectionLoader /> */}
        {/* </Suspense> */}
        {/* <Suspense fallback={<ContributorsListSectionSkeleton />}> */}
        {/*   <ContributorsListSectionLoader /> */}
        {/* </Suspense> */}
        {/* <Suspense fallback={<BackersListSectionSkeleton />}> */}
        {/*   <BackersListSectionLoader /> */}
        {/* </Suspense> */}
        <MainStats />
        <ProjectsListSection count={projects} />
        <RequestsListSection count={requests} />
        <ContributorsListSection count={contributors} />
        <BackersListSection count={backers} />
      </div>
    </div>
  );
}
