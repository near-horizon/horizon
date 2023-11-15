"use client";

import { FilterDropdown } from "~/components/inputs/filter-dropdown";
import { SearchInput } from "~/components/inputs/search";
import { PerkSkeleton } from "./card";

export function PerksSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-2 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-start gap-4">
          <h1 className="text-3xl font-bold text-text-black">Perks</h1>
          <small className="text-2xl font-normal text-ui-elements-gray"></small>
        </div>
        <h2 className="text-sm font-normal text-text-black">
          Whether you are a early stage founder or are on mainnet, we’ve got
          your covered! Discover the top tools & perks to build in web3.
        </h2>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between">
        <div className="">
          <FilterDropdown
            triggerText={"Category"}
            options={[]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
            selected={[]}
            getFilteredCount={() => 0}
          />
        </div>
        <div className="min-w-[400px]">
          <SearchInput
            placeholder="Search perks"
            value={""}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setValue={() => {}}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[...Array(9).keys()].map((key) => (
          <div key={key}>
            <PerkSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
