import { type NewProjectType } from "~/lib/validation/project/new";
import { Section, type SectionProps } from "./section";
import { NoData } from "~/components/empty";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { EyeOffSvg, File04Svg, LinkExternal01Svg, PaperclipSvg } from "~/icons";
import { ExternalLink } from "~/components/external-link";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export function Artifacts({
  artifacts,
  isOwner,
  isBacker,
}: Pick<NewProjectType, "artifacts"> & SectionProps) {
  let data = <NoData className="h-56 w-full" />;

  if (!!artifacts && artifacts.length !== 0) {
    data = (
      <div className="grid w-full grid-cols-12 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact.value.name}
            className="col-span-full items-stretch md:col-span-4"
          >
            <Artifact {...artifact} isOwner={isOwner} isBacker={isBacker} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section title="Artifacts" separator>
      {data}
    </Section>
  );
}

function Artifact({
  visible,
  value: { name, value, note },
  isOwner,
  isBacker,
}: NewProjectType["artifacts"][number] & SectionProps) {
  if (!(visible || !isBacker || !isOwner)) {
    return <></>;
  }

  const watermark = isOwner && !visible;

  return (
    <Card className="flex h-full w-full flex-col items-start justify-start gap-4 overflow-hidden rounded-lg">
      <CardHeader className="relative h-40 w-full bg-primary p-0">
        {watermark && (
          <span
            className={cn(
              "absolute right-1 top-1 z-10 rounded border border-secondary-disabled p-1",
              "flex flex-row items-center justify-start gap-1 bg-ui-elements-white text-xs font-medium",
            )}
          >
            <EyeOffSvg className="h-4 w-4 text-ui-elements-gray" />
            Visible only to backers
          </span>
        )}

        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <File04Svg className="h-20 text-ui-elements-white" />
          <PaperclipSvg className="absolute left-1/2 top-1/2 h-8 -translate-x-1/2 -translate-y-1/3 text-ui-elements-white" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col items-start justify-start gap-2">
        <span
          className={cn(
            "rounded border border-ui-elements-light bg-ui-elements-light",
            "px-2 py-1 text-sm font-medium uppercase text-ui-elements-dark",
          )}
        >
          {value.type?.split("/").pop() ?? "Web"}
        </span>

        <b>{name}</b>

        <span>{note}</span>
      </CardContent>

      <CardFooter className="flex w-full flex-row items-center justify-stretch">
        <ExternalLink href={value.file} className="w-full">
          <Button
            variant="outline"
            className="flex w-full flex-row items-center justify-center gap-2"
          >
            <LinkExternal01Svg className="h-6 w-6" />
            View attachment
          </Button>
        </ExternalLink>
      </CardFooter>
    </Card>
  );
}
