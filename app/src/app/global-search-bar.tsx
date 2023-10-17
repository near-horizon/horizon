"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchInput } from "~/components/inputs/search";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function GlobalSearchBar() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState<string>(q);
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-row items-stretch justify-start rounded-full border border-ui-elements-gray bg-background-white",
        "py-0 shadow focus-within:ring"
      )}
    >
      <SearchInput
        value={searchQuery}
        setValue={setSearchQuery}
        className="rounded-r-none border-none shadow-none focus-within:ring-0"
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
        className="h-11 rounded-l-none border-l border-l-ui-elements-gray"
      >
        Search
      </Button>
    </div>
  );
}
