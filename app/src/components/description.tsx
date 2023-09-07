import { cn } from "~/lib/utils";

export function Description({
  text,
  loading,
  full = false,
}: {
  text: string;
  loading: boolean;
  full?: boolean;
}) {
  if (loading) {
    return (
      <p>
        <b className="block h-4 w-4/5 animate-pulse bg-gray-200" />
        <br />
        <b className="block h-4 w-3/5 animate-pulse bg-gray-200" />
        <br />
        <b className="block h-4 w-full animate-pulse bg-gray-200" />
      </p>
    );
  }

  return (
    <article
      className={cn("prose w-full max-w-full leading-6", {
        "line-clamp-3": !full,
      })}
      dangerouslySetInnerHTML={{ __html: text }}
    ></article>
  );
}
