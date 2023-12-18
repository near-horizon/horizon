import Image from "next/image";
import { z } from "zod";
import { Skeleton } from "~/components/ui/skeleton";
import { Suspense } from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const linkPreviewSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
});

export function LinkPreview({ link }: { link: string }) {
  return (
    <Suspense fallback={<LinkPreviewSkeleton link={link} />}>
      <LinkPreviewAsync link={link} />
    </Suspense>
  );
}

async function LinkPreviewAsync({ link }: { link: string }) {
  const res = await fetch(
    `https://link-previews.stephanbogner.de/api?url=${link}`,
  );

  const data = linkPreviewSchema.parse(await res.json());

  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
      <div className="w-full overflow-hidden rounded-md md:w-64">
        <AspectRatio ratio={16 / 10} className="relative">
          <Image
            src={data.image}
            alt={data.title}
            unoptimized
            fill
            className="object-cover object-center"
          />
        </AspectRatio>
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-2">
        <a href={link}>
          <b className="font-semibold text-text-link underline">{data.title}</b>
        </a>

        <div className="line-clamp-2 text-sm text-ui-elements-dark md:line-clamp-3">
          {data.description}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm text-ui-elements-gray"
        >
          {link}
        </a>
      </div>
    </div>
  );
}

function LinkPreviewSkeleton({ link }: { link: string }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
      <div className="w-full overflow-hidden rounded-md md:w-64">
        <AspectRatio ratio={16 / 10} className="relative">
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-2">
        <a href={link} className="w-full">
          <b className="font-semibold text-text-link underline">
            <Skeleton className="h-4 w-1/2" />
          </b>
        </a>

        <div className="line-clamp-2 text-sm text-ui-elements-dark md:line-clamp-3">
          <Skeleton className="mb-2 h-4 w-4/5" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm text-ui-elements-gray"
        >
          {link}
        </a>
      </div>
    </div>
  );
}
