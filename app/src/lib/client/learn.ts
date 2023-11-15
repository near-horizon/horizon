import { z } from "zod";
import {
  type LearningCategory,
  learningCategorySchema,
} from "../validation/learn";

export async function getLearningResources(): Promise<LearningCategory[]> {
  const response = await fetch(`/api/learn`);
  const learningResources = z
    .array(learningCategorySchema)
    .parseAsync(await response.json());

  return learningResources;
}

export function formatCategoryLabel(categoryString: string) {
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
}
