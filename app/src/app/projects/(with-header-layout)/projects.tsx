"use client";

import React, { useState } from "react";
import { Project, ProjectSkeleton } from "../card";
import { Button } from "~/components/ui/button";
import { usePaginatedProjects, useProjectsCount } from "~/hooks/projects";
import { type ProjectsQuery } from "~/lib/validation/projects";
import { FilterDropdown } from "~/components/inputs/filter-dropdown";
import {
  devPhase,
  distribution,
  stage,
  verticals,
} from "~/lib/constants/filters";
import { getProjectsCount } from "~/lib/client/projects";
import { SortSelect } from "~/components/inputs/sort-select";
import { pageSize } from "~/lib/constants/pagination";

export function Projects() {
  const [query, setQuery] = useState<ProjectsQuery>({
    sort: "recentdesc",
    vertical: [],
  });
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedProjects(query);
  const { data: count } = useProjectsCount(query);

  return (
    <>
      <div className="flex w-full flex-row flex-wrap items-center justify-start gap-4">
        <FilterDropdown
          triggerText="Vertical"
          options={Object.entries(verticals).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onChange={(value) => {
            setQuery((old) => ({ ...old, vertical: value }));
          }}
          selected={query.vertical ?? []}
          getFilteredCount={(vertical) =>
            getProjectsCount({ ...query, vertical })
          }
        />
        <FilterDropdown
          triggerText="Stage"
          options={Object.entries(stage).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onChange={(value) => {
            setQuery((old) => ({ ...old, stage: value }));
          }}
          selected={query.stage ?? []}
          getFilteredCount={(stage) => getProjectsCount({ ...query, stage })}
        />
        <FilterDropdown
          triggerText="Distribution"
          options={Object.entries(distribution).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onChange={(value) => {
            setQuery((old) => ({ ...old, distribution: value }));
          }}
          selected={query.distribution ?? []}
          getFilteredCount={(distribution) =>
            getProjectsCount({ ...query, distribution })
          }
        />
        <FilterDropdown
          triggerText="Phase"
          options={Object.entries(devPhase).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onChange={(value) => {
            setQuery((old) => ({ ...old, dev: value }));
          }}
          selected={query.dev ?? []}
          getFilteredCount={(dev) => getProjectsCount({ ...query, dev })}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-2">
          <b>{count}</b>
          <span className="whitespace-nowrap text-text-gray">projects</span>
        </div>
        <SortSelect
          sort={query.sort ?? "recentdesc"}
          setSort={(sort) => setQuery((old) => ({ ...old, sort }))}
        />
      </div>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {status === "success" ? (
          data.pages.map(({ items }, i) => (
            <React.Fragment key={i}>
              {items.map((item) => (
                <li key={item.toString()}>
                  <Project accountId={item} />
                </li>
              ))}
            </React.Fragment>
          ))
        ) : status === "pending" ? (
          <>
            {[...Array(pageSize).keys()].map((item) => (
              <li key={item}>
                <ProjectSkeleton />
              </li>
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
      {isFetchingNextPage && <span className="animate-pulse">Loading</span>}
      {hasNextPage && (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Button variant="outline" type="button" onClick={() => fetchNextPage()}>
          Load more
        </Button>
      )}
    </>
  );
}
