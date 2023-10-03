import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

export function Tags({
  tags,
  loading,
}: {
  tags: Record<string, string> | string[];
  loading: boolean;
}) {
  const [items] = (
    loading ? ["", "", ""] : Array.isArray(tags) ? tags : Object.keys(tags)
  ).reduce(
    ([tags, length], tag) => {
      if (length > 39) {
        return [tags, length];
      }

      const tagLength = tag.length;

      return [[...tags, tag], length + tagLength];
    },
    [new Array<string>(), 0]
  );

  return (
    <span className="mt-2 inline-flex flex-row flex-wrap items-center justify-start">
      {items.slice(0, 4).map((tag, i) => (
        <Badge
          key={tag + i}
          className={cn("mr-2 rounded-lg font-normal text-ui-elements-gray", {
            "w-20 animate-pulse bg-gray-200": loading,
          })}
          variant="outline"
        >
          {tag}
        </Badge>
      ))}
    </span>
  );
}
