import clsx from "clsx";

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
    <div>
      {items.slice(0, 4).map((tag, i) => (
        <span
          key={tag + i}
          className={clsx(
            "mr-2 inline-block rounded-sm border border-gray-400 bg-white px-2 py-1 text-sm font-medium leading-4 text-gray-400",
            {
              "w-20 animate-pulse bg-gray-200": loading,
            }
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
