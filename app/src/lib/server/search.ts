import {
  type LearningCategory,
  type LearningResource,
} from "../validation/learn";
import { type SearchResult } from "../validation/search";
import { getBackers } from "./backers";
import { getContributors } from "./contributors";
import { learningResource } from "./learn";
import { getProjects } from "./projects";
import { getRequests } from "./requests";

export async function search(query: string): Promise<SearchResult> {
  const lowerCaseQuery = query.toLowerCase();
  const [projects, requests, contributors, backers] = await Promise.all([
    getProjects({ q: lowerCaseQuery }),
    getRequests({ q: lowerCaseQuery }),
    getContributors({ q: lowerCaseQuery }),
    getBackers({ q: lowerCaseQuery }),
  ]);

  const learningContent = learningResource.reduce((items, category) => {
    if (category.title.toLowerCase().includes(lowerCaseQuery)) {
      items.push(
        ...category.items.map((item) => ({ ...item, id: category.id }))
      );
    } else {
      const filteredItems = category.items.filter(
        ({ title, description }) =>
          title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery)
      );
      if (filteredItems.length > 0) {
        items.push(
          ...filteredItems.map((item) => ({ ...item, id: category.id }))
        );
      }
    }

    return items;
  }, new Array<LearningResource & Omit<LearningCategory, "items">>(0));

  return {
    projects,
    requests,
    contributors,
    backers,
    learningContent,
  };
}
