import { type NewProjectType } from "~/lib/validation/project/new";
import { Section, type SectionProps } from "./section";
import { NoData } from "~/components/empty";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";
import { LinkPreview } from "./link-preview";

export function MediaCoverage({
  media,
  isOwner,
  isBacker,
}: Pick<NewProjectType, "media"> & SectionProps) {
  let data = <NoData className="h-56 w-full" />;

  if (!!media.value && media.value.length !== 0) {
    data = (
      <div className="flex flex-col items-start justify-start gap-4">
        {media.value.map(({ link }) => (
          <LinkPreview link={link} key={link} />
        ))}
      </div>
    );
  }

  return (
    <Section
      title="Media coverage"
      hide={!(media.visible || isBacker || isOwner)}
      watermark={isOwner && !media.visible}
      separator
    >
      {data}
    </Section>
  );
}
