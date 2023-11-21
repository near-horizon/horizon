import { search } from "~/lib/server/search";
import { Project } from "../projects/card";
import { Request } from "../requests/card";
import { Contributor } from "../contributors/card";
import { Backer } from "../backers/card";
import { LearnCard } from "~/app/learn/card";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";

const filterSchema = z
  .enum([
    "projects",
    "requests",
    "contributors",
    "backers",
    "learningContent",
    "all",
  ])
  .default("all");
type Filter = z.infer<typeof filterSchema>;

export default async function Page({
  searchParams: { q, filter },
}: {
  searchParams: { q: string; filter: Filter };
}) {
  filter = filterSchema.parse(filter);
  const { projects, requests, contributors, backers, learningContent } =
    await search(q);

  const count =
    projects.length +
    requests.length +
    contributors.length +
    backers.length +
    learningContent.length;

  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <h1 className="flex w-full flex-row items-center justify-start gap-2 text-3xl font-semibold">
          Search results
          <small className="font-normal text-ui-elements-gray">{count}</small>
        </h1>
        <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
          <FilterButton
            q={q}
            filter="all"
            currentFilter={filter}
            text="All"
            count={count}
          />
          <FilterButton
            q={q}
            filter="projects"
            currentFilter={filter}
            text="Projects"
            count={projects.length}
          />
          <FilterButton
            q={q}
            filter="requests"
            currentFilter={filter}
            text="Requests"
            count={requests.length}
          />
          <FilterButton
            q={q}
            filter="contributors"
            currentFilter={filter}
            text="Contributors"
            count={contributors.length}
          />
          <FilterButton
            q={q}
            filter="backers"
            currentFilter={filter}
            text="Backers"
            count={backers.length}
          />
          <FilterButton
            q={q}
            filter="learningContent"
            currentFilter={filter}
            text="Learning content"
            count={learningContent.length}
          />
        </div>
        <Section
          title="Projects"
          count={projects.length}
          filter="projects"
          currentFilter={filter}
          q={q}
        >
          {projects.map(([project]) => (
            <li key={project} className="w-full">
              <Project accountId={project} />
            </li>
          ))}
        </Section>
        <Section
          title="Requests"
          count={requests.length}
          filter="requests"
          currentFilter={filter}
          q={q}
        >
          {requests.map(({ project_id, cid }) => (
            <li key={`${project_id}-${cid}`} className="w-full">
              <Request accountId={project_id} cid={cid ?? ""} />
            </li>
          ))}
        </Section>
        <Section
          title="Contributors"
          count={contributors.length}
          filter="contributors"
          currentFilter={filter}
          q={q}
        >
          {contributors.map(([contributor]) => (
            <li key={contributor} className="w-full">
              <Contributor accountId={contributor} />
            </li>
          ))}
        </Section>
        <Section
          title="Backers"
          count={backers.length}
          filter="backers"
          currentFilter={filter}
          q={q}
        >
          {backers.map(([backer]) => (
            <li key={backer} className="w-full">
              <Backer accountId={backer} />
            </li>
          ))}
        </Section>
        <Section
          title="Learning content"
          count={learningContent.length}
          filter="learningContent"
          currentFilter={filter}
          q={q}
        >
          {learningContent.map((content) => (
            <li key={content.title} className="w-full">
              <LearnCard resource={content} />
            </li>
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({
  q,
  title,
  count,
  children,
  filter,
  currentFilter,
}: {
  q: string;
  title: string;
  count: number;
  children: React.ReactNode;
  filter: Filter;
  currentFilter: Filter;
}) {
  if (count === 0 || !["all", filter].includes(currentFilter)) return null;

  return (
    <section className="flex w-full flex-col items-start justify-start gap-2">
      <h2 className="flex w-full flex-row items-center justify-start gap-2 text-2xl font-semibold">
        {title}
        <small className="font-normal text-ui-elements-gray">{count}</small>
      </h2>
      <ul
        className={cn("flex w-full max-w-[800px] flex-col items-start gap-4", {
          "[&>li:nth-child(n+5)]:hidden": currentFilter === "all",
        })}
      >
        {children}
      </ul>
      {currentFilter === "all" && count > 4 && (
        <Button variant="outline">
          <Link href={`/search?q=${q}&filter=${filter}`}>Show all</Link>
        </Button>
      )}
    </section>
  );
}

function FilterButton({
  q,
  filter,
  currentFilter,
  text,
  count,
}: {
  q: string;
  filter: Filter;
  currentFilter: Filter;
  text: string;
  count: number;
}) {
  if (count === 0) return null;

  return (
    <Button
      variant="outline"
      disabled={filter === currentFilter}
      className={cn("flex flex-row items-center justify-center", {
        "bg-background-black text-ui-elements-white disabled:opacity-100":
          filter === currentFilter,
      })}
    >
      <Link
        href={`/search?q=${q}&filter=${filter}`}
        className="flex h-full w-full flex-row items-center justify-center gap-2"
      >
        {text}
        <small className="font-normal text-ui-elements-gray">{count}</small>
      </Link>
    </Button>
  );
}
