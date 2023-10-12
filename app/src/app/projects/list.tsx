"use client";

import { useProjects } from "~/hooks/projects";
import { Project, ProjectSkeleton } from "./card";
import { List } from "~/components/home/list";
import { query } from "~/lib/constants/pagination";

export function ProjectsListSection({ count }: { count: number }) {
  const { data: projects, status } = useProjects(query);

  if (status === "loading") {
    return <ProjectsListSectionSkeleton />;
  }

  if (status === "error") {
    return <span className="text-red-500">Error loading projects</span>;
  }

  return (
    <List
      items={projects}
      renderItem={(accountId) => <Project accountId={accountId} />}
      title="Projects"
      count={count}
      link="/projects"
      linkText="View all projects"
    />
  );
}

export function ProjectsListSectionSkeleton() {
  return (
    <List
      items={[...new Array<string>(8).fill("")]}
      renderItem={() => <ProjectSkeleton />}
      title="Projects"
      link="/projects"
      linkText="View all projects"
    />
  );
}
