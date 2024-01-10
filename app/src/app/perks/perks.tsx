"use client";

import { useCallback, useState } from "react";
import { FilterDropdown } from "~/components/inputs/filter-dropdown";
import { SearchInput } from "~/components/inputs/search";
import { Perk } from "./card";
import { usePerkCategories, usePerks } from "~/hooks/perks";

export function Perks({ noButton = false }: { noButton?: boolean }) {
  const { data } = usePerks();
  const categories = usePerkCategories();
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const filterData = useCallback(
    (selected: string[], search: string) => {
      if (selected.length === 0) {
        return data;
      }

      return data?.filter(
        ({ fields: { category, name, description, benefit } }) =>
          category.some((c) => selected.includes(c)) &&
          (name.toLowerCase().includes(search.toLowerCase()) ||
            description.toLowerCase().includes(search.toLowerCase()) ||
            benefit.toLowerCase().includes(search.toLowerCase())),
      );
    },
    [data],
  );

  return (
    <div className="flex flex-col gap-6 px-2 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-start gap-4">
          <h1 className="text-3xl font-bold text-text-black">Perks</h1>
          <small className="text-2xl font-normal text-ui-elements-gray">
            {data.length}
          </small>
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
            options={categories.map((value) => ({ value, label: value }))}
            onChange={setSelected}
            selected={selected}
            getFilteredCount={(selected) => filterData(selected, search).length}
          />
        </div>
        <div className="min-w-[400px]">
          <SearchInput
            placeholder="Search perks"
            value={search}
            setValue={(value) => setSearch(value)}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filterData(selected, search).map((perk) => (
          <div key={perk.id}>
            <Perk {...perk} noButton={noButton} />
          </div>
        ))}
      </div>
    </div>
  );
}
