"use client";

import React from "react";
import { Project } from "../card";
import { Button } from "~/components/ui/button";
import { useBackerPaginatedProjects } from "~/hooks/projects";
import { NoData } from "~/components/empty";

export function BackerProjects() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useBackerPaginatedProjects();

  return (
    <>
      {status === "success" &&
      data.pages.length > 0 &&
      data.pages[0] &&
      data.pages[0].items.length > 0 ? (
        <ul className="flex flex-row flex-wrap items-stretch justify-start gap-2">
          {data.pages.map(({ items }, i) => (
            <React.Fragment key={i}>
              {items.map((item) => (
                <li
                  key={item.toString()}
                  className="w-full md:w-[calc((100%-.5rem)*.5)] lg:w-[calc((100%-1rem)*.33)] 2xl:w-[calc((100%-1.5rem)*.25)]"
                >
                  <Project accountId={item} />
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <NoData
          className="h-96 w-full"
          description="It looks like no projects are fundraising"
        />
      )}
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
