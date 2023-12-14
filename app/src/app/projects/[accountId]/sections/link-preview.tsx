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
    <div className="flex w-full flex-row items-start justify-start gap-6">
      <div className="w-64 overflow-hidden rounded-md">
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

        <div className="text-sm text-ui-elements-dark">{data.description}</div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ui-elements-gray"
        >
          {link}
        </a>
      </div>
    </div>
  );
}

function LinkPreviewSkeleton({ link }: { link: string }) {
  return (
    <div className="flex w-full flex-row items-start justify-start gap-6">
      <div className="w-64 overflow-hidden rounded-md">
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

        <div className="w-full text-sm text-ui-elements-dark">
          <Skeleton className="mb-2 h-4 w-4/5" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ui-elements-gray"
        >
          {link}
        </a>
      </div>
    </div>
  );
}
