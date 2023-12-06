"use client";

import { useState } from "react";
import { SearchInput } from "~/components/inputs/search";
import { FilterDropdown } from "~/components/inputs/filter-dropdown";
import { LearnCard } from "./card";
import type { LearningCategory } from "~/lib/validation/learn";
import {
  learningResources,
  learningResourcesCount,
  tagCategories,
  typeCategories,
} from "~/lib/constants/learn";
import { Toggleable } from "~/components/toggleable";

export default function LearnPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);

  const filterData = (
    selectedCategories: string[],
    selectedTypes: string[],
    search: string,
  ) =>
    learningResources
      .map((resourceItem) => ({
        ...resourceItem,
        items: resourceItem.items.filter(
          (resource) =>
            (selectedCategories.length === 0 ||
              resource.tags.some((tag) => selectedCategories.includes(tag))) &&
            (search.length === 0 ||
              resource.title.toLowerCase().includes(search.toLowerCase()) ||
              resource.description
                .toLowerCase()
                .includes(search.toLowerCase())),
        ),
      }))
      .filter(
        (resourceItem) =>
          resourceItem.items.length > 0 &&
          (selectedTypes.length === 0 ||
            selectedTypes.includes(resourceItem.id)),
      );

  return (
    <div className="flex flex-col items-center gap-8 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <Toggleable
        id="toggleable"
        value={visible}
        onChange={(visible) => setVisible(visible)}
      >
        Hello
      </Toggleable>
      <div className="flex w-full max-w-[max(calc(100%-1rem),1536px)] flex-col gap-8 2xl:mx-auto">
        <div className="mb-6 text-3xl font-bold tracking-wide text-gray-900">
          Learning resources{" "}
          <span className="text-2xl font-normal text-ui-elements-gray">
            {learningResourcesCount}
          </span>
        </div>
        <div>
          <div className="flex gap-2">
            <FilterDropdown
              triggerText="Category"
              options={tagCategories}
              onChange={setSelectedCategories}
              selected={selectedCategories}
              getFilteredCount={(selected) =>
                filterData(selected, selectedTypes, searchText).reduce(
                  (acc: number, resourceItem: LearningCategory) =>
                    acc + resourceItem.items.length,
                  0,
                )
              }
            />
            <FilterDropdown
              triggerText="Type"
              options={typeCategories}
              onChange={setSelectedTypes}
              selected={selectedTypes}
              getFilteredCount={(selected) =>
                filterData(selectedCategories, selected, searchText).reduce(
                  (acc: number, resourceItem: LearningCategory) =>
                    acc + resourceItem.items.length,
                  0,
                )
              }
            />
          </div>
          {/* Quick filters will go here */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-ui-elements-dark">
              <span className="font-bold">
                {filterData(
                  selectedCategories,
                  selectedTypes,
                  searchText,
                ).reduce(
                  (acc: number, resourceItem: LearningCategory) =>
                    acc + resourceItem.items.length,
                  0,
                )}{" "}
              </span>
              <span className="font-normal">results</span>
            </div>

            <SearchInput
              value={searchText}
              placeholder="Search resources"
              setValue={(inputVal) => setSearchText(inputVal)}
            />
          </div>
        </div>
        <div>
          {filterData(selectedCategories, selectedTypes, searchText).map(
            (resource: LearningCategory, i: number) => {
              return (
                <div key={resource.id} className={`${i !== 0 ? "mt-14" : ""}`}>
                  <h3 className="mb-8 text-2xl font-bold">{resource.title}</h3>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {resource.items.map((resource) => (
                      <div key={resource.title}>
                        <LearnCard resource={resource} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
