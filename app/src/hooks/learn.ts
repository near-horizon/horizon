import { useQuery } from "@tanstack/react-query";
import { formatCategoryLabel, getLearningResources } from "~/lib/client/learn";

export function useLearningResources() {
  return useQuery({
    queryKey: ["learningResources"],
    queryFn: getLearningResources,
    initialData: [],
  });
}

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
