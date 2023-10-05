import { useCallback, useState } from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { SearchInput } from "~/components/inputs/search";
import { FilterDropdown } from "~/components/inputs/filter-dropdown";
import { LearnCard } from "~/components/learn/learn-card";

import { withSSRSession } from "~/lib/auth";
import {
  useLearningCategories,
  useLearningResources,
  useLearningResourcesTotalCount,
} from "~/lib/learn";
import type { LearningCategory } from "~/lib/validation/learn";

import { learningResource } from "./api/learn";

export default function Learn() {
  const { data } = useLearningResources();
  const { tagCategories: tagFilterOptions, typeCategories: typeFilterOptions } =
    useLearningCategories();
  const totalResourcesCount = useLearningResourcesTotalCount();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const filterData = useCallback(
    (selectedCategories: string[], selectedTypes: string[], search: string) =>
      data
        .map((resourceItem) => ({
          ...resourceItem,
          items: resourceItem.items.filter(
            (resource) =>
              (selectedCategories.length === 0 ||
                resource.tags.some((tag) =>
                  selectedCategories.includes(tag)
                )) &&
              (search.length === 0 ||
                resource.title.toLowerCase().includes(search.toLowerCase()) ||
                resource.description
                  .toLowerCase()
                  .includes(search.toLowerCase()))
          ),
        }))
        .filter(
          (resourceItem) =>
            resourceItem.items.length > 0 &&
            (selectedTypes.length === 0 ||
              selectedTypes.includes(resourceItem.id))
        ),
    [data]
  );

  return (
    <div className="flex w-full max-w-[max(calc(100%-1rem),1536px)] flex-col gap-8 2xl:mx-auto">
      <div className="mb-6 text-3xl font-bold tracking-wide text-gray-900">
        Learning resources{" "}
        <span className="text-2xl font-normal text-ui-elements-gray">
          {totalResourcesCount}
        </span>
      </div>
      <div>
        <div className="flex gap-2">
          <FilterDropdown
            triggerText="Category"
            options={tagFilterOptions}
            onChange={setSelectedCategories}
            selected={selectedCategories}
            getFilteredCount={(selected) =>
              filterData(selected, selectedTypes, searchText).reduce(
                (acc: number, resourceItem: LearningCategory) =>
                  acc + resourceItem.items.length,
                0
              )
            }
          />
          <FilterDropdown
            triggerText="Type"
            options={typeFilterOptions}
            onChange={setSelectedTypes}
            selected={selectedTypes}
            getFilteredCount={(selected) =>
              filterData(selectedCategories, selected, searchText).reduce(
                (acc: number, resourceItem: LearningCategory) =>
                  acc + resourceItem.items.length,
                0
              )
            }
          />
        </div>
        {/* Quick filters will go here */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-ui-elements-dark">
            <span className="font-bold">
              {filterData(selectedCategories, selectedTypes, searchText).reduce(
                (acc: number, resourceItem: LearningCategory) =>
                  acc + resourceItem.items.length,
                0
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
                <div className="flex flex-row flex-wrap items-stretch justify-start gap-8">
                  {resource.items.map((resource) => (
                    <LearnCard resource={resource} key={resource.title} />
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withSSRSession(async function ({}) {
  const queryClient = new QueryClient();

  queryClient.setQueryData(["learningResources"], learningResource);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
