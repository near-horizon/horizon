"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchInput } from "~/components/inputs/search";
import { Button } from "~/components/ui/button";

export function GlobalSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex flex-row items-stretch justify-start">
      <SearchInput
        value={searchQuery}
        setValue={setSearchQuery}
        className="rounded-r-none"
        placeholder="Search..."
      />
      <Button
        variant="default"
        onClick={() => {
          router.push(`/search?query=${searchQuery}`);
        }}
        className="h-11 rounded-l-none border border-ui-elements-black"
      >
        Search
      </Button>
    </div>
  );
}
