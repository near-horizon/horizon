"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { SearchInput } from "~/components/inputs/search";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useSearch } from "~/hooks/search";
import { cn } from "~/lib/utils";
import SearchIcon from "~/components/icons/search-sm.svg";
import UserIcon from "~/components/icons/user-02.svg";
import LearnIcon from "~/components/icons/book-open-02.svg";
import Link from "next/link";
import { IPFSImage } from "~/components/ipfs-image";
import { ExternalLink } from "~/components/external-link";
import Image from "next/image";

export function GlobalSearchBar() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState<string>(q);
  const router = useRouter();
  const toSearch = useDeferredValue(searchQuery);
  const { data, status } = useSearch(toSearch);

  return (
    <div
      className={cn(
        "relative flex flex-row items-stretch justify-start rounded-full border border-primary-disabled bg-background-white",
        "group w-[min(90%,30rem)] py-0 shadow focus-within:ring"
      )}
    >
      <SearchInput
        value={searchQuery}
        setValue={setSearchQuery}
        className="flex-grow rounded-r-none border-none shadow-none focus-within:ring-0"
        placeholder="Search..."
        onEnter={() => {
          router.push(`/search?q=${searchQuery}`);
        }}
      />
      <Button
        variant="default"
        onClick={() => {
          router.push(`/search?q=${searchQuery}`);
        }}
        className="h-11 rounded-l-none border-l border-l-primary-disabled"
      >
        Search
      </Button>
      <div className="absolute left-0 top-full z-50 mt-2 hidden w-full rounded-lg bg-white p-4 shadow group-focus-within:block">
        {searchQuery === "" ? (
          <></>
        ) : status === "loading" ? (
          <SearchLoader />
        ) : status === "error" ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            Couldn&apos;t fetch search results
          </div>
        ) : (
          <ul className="flex flex-col items-start justify-start">
            {data.projects.slice(0, 4).map(([accountId, project]) => (
              <li key={accountId}>
                <Link
                  href={`/projects/${accountId}`}
                  className="flex w-full flex-row items-center justify-start gap-3"
                >
                  <SearchIcon className="h-4 w-4" />
                  {project.image && "ipfs_cid" in project.image ? (
                    <IPFSImage
                      cid={project.image.ipfs_cid}
                      className="h-4 w-4 flex-shrink-0 rounded-lg"
                    />
                  ) : (
                    <UserIcon className="h-4 w-4 flex-shrink-0 rounded-lg" />
                  )}
                  <b className="max-w-[30ch] truncate">
                    {project.name ?? accountId}
                  </b>
                  <small>Project</small>
                </Link>
              </li>
            ))}
            {data.requests
              .slice(0, 4)
              .map(({ project_id, cid, title, image }) => (
                <li key={`${project_id}-${cid}`}>
                  <Link
                    href={`/requests/${project_id}/${cid}`}
                    className="flex w-full flex-row items-center justify-start gap-3"
                  >
                    <SearchIcon className="h-4 w-4" />
                    {image && "ipfs_cid" in image ? (
                      <IPFSImage
                        cid={image.ipfs_cid}
                        className="h-4 w-4 flex-shrink-0 rounded-lg"
                      />
                    ) : (
                      <UserIcon className="h-4 w-4 flex-shrink-0 rounded-lg" />
                    )}
                    <b className="max-w-[30ch] truncate">{title}</b>
                    <small>Request</small>
                  </Link>
                </li>
              ))}
            {data.contributors.slice(0, 4).map(([accountId, contributor]) => (
              <li key={accountId}>
                <Link
                  href={`/contributor/${accountId}`}
                  className="flex w-full flex-row items-center justify-start gap-3"
                >
                  <SearchIcon className="h-4 w-4" />
                  {contributor.image && "ipfs_cid" in contributor.image ? (
                    <IPFSImage
                      cid={contributor.image.ipfs_cid}
                      className="h-4 w-4 flex-shrink-0 rounded-lg"
                    />
                  ) : (
                    <UserIcon className="h-4 w-4 flex-shrink-0 rounded-lg" />
                  )}
                  <b className="max-w-[30ch] truncate">
                    {contributor.name ?? accountId}
                  </b>
                  <small>Contributor</small>
                </Link>
              </li>
            ))}
            {data.backers.slice(0, 4).map(([accountId, backer]) => (
              <li key={accountId}>
                <Link
                  href={`/backers/${accountId}`}
                  className="flex w-full flex-row items-center justify-start gap-3"
                >
                  <SearchIcon className="h-4 w-4" />
                  {backer.image && "ipfs_cid" in backer.image ? (
                    <IPFSImage
                      cid={backer.image.ipfs_cid}
                      className="h-4 w-4 flex-shrink-0 rounded-lg"
                    />
                  ) : (
                    <UserIcon className="h-4 w-4 flex-shrink-0 rounded-lg" />
                  )}
                  <b className="max-w-[30ch] truncate">
                    {backer.name ?? accountId}
                  </b>
                  <small>Backer</small>
                </Link>
              </li>
            ))}
            {data.learningContent.slice(0, 4).map((content) => (
              <li key={content.title}>
                <ExternalLink
                  href={content.link}
                  className="flex w-full flex-row items-center justify-start gap-3"
                >
                  <SearchIcon className="h-4 w-4" />
                  {content.img ? (
                    <div className="relative h-4 w-4 flex-shrink-0 rounded-lg">
                      <Image
                        src={content.img}
                        alt={content.title}
                        unoptimized
                        fill
                      />
                    </div>
                  ) : (
                    <LearnIcon className="h-4 w-4 flex-shrink-0 rounded-lg" />
                  )}
                  <b className="max-w-[30ch] truncate">{content.title}</b>
                  <small>Learning content</small>
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchLoader() {
  return (
    <ul className="flex w-full flex-col items-start justify-start gap-3">
      {[...Array(3).keys()].map((i) => (
        <li
          className="flex w-full flex-row items-center justify-start gap-3"
          key={i}
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-44" />
        </li>
      ))}
    </ul>
  );
}
