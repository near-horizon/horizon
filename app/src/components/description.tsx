import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function Description({
  text,
  full = false,
}: {
  text: string;
  full?: boolean;
}) {
  return (
    <article
      className={cn("prose w-full max-w-full leading-6", {
        "line-clamp-3": !full,
      })}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export function DescriptionSkeleton({ full = false }: { full?: boolean }) {
  return (
    <article className="prose w-full max-w-full space-y-2 leading-6">
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-4 w-full" />
      {full && (
        <>
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-full" />
        </>
      )}
    </article>
  );
}
