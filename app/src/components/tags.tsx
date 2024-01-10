import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

export function Tags({ tags }: { tags: Record<string, string> | string[] }) {
  const [items] = (Array.isArray(tags) ? tags : Object.keys(tags)).reduce(
    ([tags, length], tag) => {
      if (length > 39) {
        return [tags, length];
      }

      return [[...tags, tag], length + tag.length];
    },
    [new Array<string>(), 0],
  );

  return (
    <span className="mt-2 inline-flex flex-row flex-wrap items-center justify-start">
      {items.slice(0, 4).map((tag, i) => (
        <Badge
          key={tag + i}
          className="mr-2 rounded-lg font-normal text-ui-elements-gray"
          variant="outline"
        >
          {tag}
        </Badge>
      ))}
    </span>
  );
}

export function TagsSkeleton() {
  return (
    <span className="mt-2 inline-flex flex-row flex-wrap items-center justify-start">
      {[...Array(4).keys()].map((i) => (
        <Badge
          key={i}
          className="mr-2 rounded-lg font-normal text-ui-elements-gray"
          variant="outline"
        >
          <Skeleton className="w-20" />
        </Badge>
      ))}
    </span>
  );
}
