import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import {
  learningCategorySchema,
  type LearningCategory,
} from "./validation/learn";

export async function getLearningResources(): Promise<LearningCategory[]> {
  const response = await fetch(`/api/learn`);
  const learningResources = z
    .array(learningCategorySchema)
    .parseAsync(await response.json());

  return learningResources;
}

export function useLearningResources() {
  return useQuery({
    queryKey: ["learningResources"],
    queryFn: getLearningResources,
    initialData: [],
  });
}

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

export function useLearningCategories() {
  const { data: learningResources } = useLearningResources();
  const tagCategories: { value: string; label: string }[] = learningResources
    .reduce((tags, resourceItem) => {
      resourceItem.items.forEach((resource) => {
        resource.tags.forEach((tag) => {
          if (!tags.includes(tag)) tags.push(tag);
        });
      });
      return tags;
    }, new Array<string>())
    .map((category) => ({
      value: category,
      label: formatCategoryLabel(category),
    }));

  const typeCategories: { value: string; label: string }[] =
    learningResources.map((resourceItem) => ({
      value: resourceItem.id,
      label: resourceItem.title,
    }));
  return { tagCategories, typeCategories };
}

export function useLearningResourcesTotalCount() {
  const { data: learningResources } = useLearningResources();

  return learningResources.reduce(
    (acc: number, resourceItem) => acc + resourceItem.items.length,
    0
  );
}
