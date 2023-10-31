"use client";

import React from "react";
import { Backer } from "../card";
import { Button } from "~/components/ui/button";
import { usePaginatedBackers } from "~/hooks/backers";

export function Backers() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePaginatedBackers();

  return (
    <>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {status === "success" &&
          data.pages.map(({ items }, i) => (
            <React.Fragment key={i}>
              {items.map((item) => (
                <li key={item}>
                  <Backer accountId={item} />
                </li>
              ))}
            </React.Fragment>
          ))}
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
