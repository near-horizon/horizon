import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Toggle } from "~/components/ui/toggle";
import { Input } from "~/components/ui/input";
import { DropdownMenuTriggerWithArrow } from "~/components/inputs/dropdownMenuTriggerWithArrow";
import LinkExternal from "~/components/icons/link-external-02.1.svg";

import { withSSRSession } from "~/lib/auth";

import { debounce } from "~/lib/utils";

import {
  learningResources,
  SectionTitles,
  LearningResourceItem,
} from "~/lib/constants/learning";
import { Button } from "~/components/ui/button";

export default function Learn() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");
  const [filteredResources, setFilteredResources] = useState<
    { type: string; resources: LearningResourceItem[] }[]
  >([]);

  const totalCount: number = Object.values(learningResources).reduce(
    (acc, resourceArray) => acc + resourceArray.length,
    0
  );

  const filterCategoryOptions: string[] = Object.values(
    learningResources
  ).reduce((acc: string[], resourceArray: LearningResourceItem[]) => {
    resourceArray.forEach((resource: LearningResourceItem) => {
      resource.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
    });
    return acc;
  }, [] as string[]);

  const filterTypeOptions = Object.entries(SectionTitles);

  const filteredResourcesCount = filteredResources.reduce(
    (acc, resourceArray) => acc + resourceArray.resources.length,
    0
  );

  const formatCategoryLabel = (categoryString: string) => {
    let formattedString = categoryString
      .replace(/-/g, " ")
      .replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      });

    formattedString = formattedString
      .replace(/\b&\b/g, " & ")
      .replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      });

    return formattedString;
  };

  const handleCategoryChange = (category: string) =>
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );

  const handleTypeChange = (type: string) =>
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );

  const handleInputChange = debounce((inputVal) => {
    setSearchText(inputVal);
    handleApplyFilters();
  }, 300);

  const handleClearSelectedTypes = () => {
    setSelectedTypes([]);
    handleApplyFilters();
  };
  const handleClearSelectedCategories = () => {
    setSelectedCategories([]);
    handleApplyFilters();
  };

  const handleApplyFilters = () => {
    const filterResults = Object.entries(learningResources)
      .filter(([resourceKey, resourceArray]) => {
        const selectedCategoriesEmpty = selectedCategories.length === 0;
        const selectedTypesEmpty = selectedTypes.length === 0;

        const resourceTags: string[] = resourceArray.reduce(
          (acc: string[], resource: LearningResourceItem) => {
            resource.tags.forEach((tag: string) => {
              if (!acc.includes(tag)) {
                acc.push(tag);
              }
            });

            return acc;
          },
          [] as string[]
        );

        if (
          (selectedTypesEmpty || selectedTypes.includes(resourceKey)) &&
          (selectedCategoriesEmpty ||
            selectedCategories.some((cat) => resourceTags.includes(cat))) &&
          (searchText === "" ||
            resourceArray.some(
              (resource: LearningResourceItem) =>
                resource.title
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                resource.description
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            ))
        ) {
          return true;
        }
        return false;
      })
      .map(
        ([resourceKey, resourceArray]): {
          type: string;
          resources: LearningResourceItem[];
        } => ({
          type: resourceKey,
          resources: resourceArray.filter(
            (resource: LearningResourceItem) =>
              (selectedCategories.length === 0 ||
                resource.tags.some((tag) =>
                  selectedCategories.includes(tag)
                )) &&
              (selectedTypes.length === 0 ||
                selectedTypes.includes(resourceKey)) &&
              (searchText === "" ||
                resource.title
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                resource.description
                  .toLowerCase()
                  .includes(searchText.toLowerCase()))
          ),
        })
      );
    setFilteredResources(filterResults);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-3xl font-bold tracking-wide text-gray-900">
        Learning resources{" "}
        <span className="text-2xl font-normal text-ui-elements-gray">
          {totalCount}
        </span>
      </div>
      <div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTriggerWithArrow className="mr-5 flex h-9 w-32 flex-row items-center justify-center gap-2 overflow-hidden rounded-full border border-ui-elements-light bg-background-light p-2  focus-visible:ring-0">
              <span className=" text-sm font-semibold tracking-wide">
                Category
              </span>
            </DropdownMenuTriggerWithArrow>
            <DropdownMenuContent className="max-w-sm">
              <div className="flex flex-wrap gap-1">
                {filterCategoryOptions.map((category) => (
                  <Toggle
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    data-state={
                      selectedCategories.includes(category) ? "on" : "off"
                    }
                  >
                    {formatCategoryLabel(category)}
                  </Toggle>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="flex justify-center gap-1">
                <Button
                  onClick={handleClearSelectedCategories}
                  disabled={!selectedCategories.length}
                >
                  Clear filters
                </Button>
                <Button onClick={handleApplyFilters}>
                  Show {filteredResourcesCount || totalCount} results
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTriggerWithArrow className="flex h-9 w-24 flex-row items-center justify-center gap-2 overflow-hidden rounded-full border border-ui-elements-light bg-background-light p-2 focus-visible:ring-0">
              <span className="text-sm font-semibold tracking-wide">Type</span>
            </DropdownMenuTriggerWithArrow>
            <DropdownMenuContent className="max-w-sm">
              <div className="flex flex-wrap gap-1">
                {filterTypeOptions.map(([key, value]) => (
                  <Toggle
                    key={key}
                    onClick={() => handleTypeChange(key)}
                    data-state={selectedTypes.includes(key) ? "on" : "off"}
                  >
                    {value}
                  </Toggle>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="flex justify-center gap-1 py-1">
                <Button
                  onClick={handleClearSelectedTypes}
                  disabled={!selectedTypes.length}
                >
                  Clear filters
                </Button>
                <Button onClick={handleApplyFilters}>
                  Show {filteredResourcesCount || totalCount} results
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Quick filters will go here */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-ui-elements-dark">
            <span className="font-bold">{filteredResourcesCount} </span>
            <span className="font-normal">results</span>
          </div>

          <Input
            type="text"
            className="h-9 w-3/12"
            value={searchText}
            placeholder="Search"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </div>
      <div>
        {filteredResources.map((resource, i) => {
          return (
            <div key={resource.type} className={`${i !== 0 ? "mt-14" : ""}`}>
              <h3 className="mb-8 text-2xl font-bold">
                {
                  (SectionTitles as Record<string, SectionTitles>)[
                    resource.type
                  ]
                }
              </h3>
              <div className="flex flex-row flex-wrap items-stretch justify-start gap-8">
                {resource.resources.map((resource: LearningResourceItem) => (
                  <Card className="flex w-full shadow-md md:w-[calc((100%-.5rem)*.99)] lg:w-[calc((100%-1rem)*.45)] 2xl:w-[calc((100%-1.5rem)*.33)]">
                    <CardContent className="flex flex-1 flex-col p-0 ">
                      <CardHeader className="mb-3 flex-1 p-4">
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>

                      <CardDescription className="text-md flex-1  p-4 pt-0 text-sm font-normal text-black">
                        {resource.description}
                      </CardDescription>
                      <CardFooter className="border-t-[1px] pt-6">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={resource.link}
                          className="w-full rounded-full border border-ui-elements-light bg-background-light py-2 text-text-link"
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-md mr-2 font-semibold">
                              Learn more
                            </span>

                            <LinkExternal
                              className="mt-[2px] h-4  w-4"
                              viewBox="0 0 24 24"
                            />
                          </div>
                        </a>
                      </CardFooter>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withSSRSession(async function () {
  return { props: {} };
});
