import React from "react";
import { cn } from "~/lib/utils";

export function ListPage<T extends (string | [string, string])[]>({
  title,
  pages,
  loading,
  fetchNextPage,
  isFetchingNextPage,
  renderItem,
  hasNextPage,
}: {
  title: string;
  pages: T[];
  loading: boolean;
  fetchNextPage(): void;
  isFetchingNextPage: boolean;
  renderItem: (item: T[number]) => React.ReactNode;
  hasNextPage: boolean;
}) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-row flex-wrap items-stretch justify-start gap-2">
          {pages.map((items, i) => (
            <React.Fragment key={i}>
              {items.map((item) => (
                <li
                  key={item.toString()}
                  className="w-full md:w-[calc((100%-.5rem)*.5)] lg:w-[calc((100%-1rem)*.33)] 2xl:w-[calc((100%-1.5rem)*.25)]"
                >
                  {renderItem(item)}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
      <span className={cn({ hidden: !isFetchingNextPage }, "animate-pulse")}>
        Loading
      </span>
      <button onClick={fetchNextPage} className={cn({ hidden: !hasNextPage })}>
        Load more
      </button>
    </div>
  );
}
