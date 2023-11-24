import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tags } from "~/components/tags";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { ExternalLink } from "~/components/external-link";
import { Button } from "~/components/ui/button";
import { type GrowthProgram } from "~/lib/validation/growth-programs";
import {
  ClockFastForwardSvg,
  Contrast01Svg,
  Cube012Svg,
  MarkerPin013Svg,
  Send011Svg,
} from "~/icons";

export default function GrowthProgramCard({
  program,
}: {
  program: GrowthProgram;
}) {
  return (
    <Card className="flex shadow-md">
      <CardContent className="flex flex-col px-0  pb-0">
        <CardHeader className="flex flex-row items-center px-6">
          <div className="relative mr-4 h-16 w-16">
            <Image
              src={program.imageSrc}
              alt={program.name}
              className="object-contain"
              fill
              unoptimized
            />
          </div>

          <div>
            <CardTitle className="text-lg font-semibold tracking-wide">
              {program.name}
            </CardTitle>
            <div className="font-mono text-sm font-normal tracking-normal text-ui-elements-dark">
              {program.subHeader}
            </div>
            <div
              className={cn(
                "mt-3 flex flex-row items-center text-xs font-medium text-green-500 ",
                !program.open && "text-[#FF7966]"
              )}
            >
              {program.open ? (
                <div className="flex flex-row items-center">
                  <span className=" mr-1 h-2 w-2 rounded-full bg-green-500" />
                  <span>Receiving applications</span>
                </div>
              ) : (
                "Applications closed"
              )}
            </div>
          </div>
        </CardHeader>
        <CardDescription className="flex flex-grow flex-col p-6 pt-0">
          <div className="mb-3 flex-grow text-sm font-normal tracking-wide text-ui-elements-dark">
            {program.tagLine}
          </div>

          <Tags tags={program.tags} />
          <div className="mt-3 flex flex-wrap gap-6">
            <div className="flex items-center gap-1">
              <ClockFastForwardSvg className="h-5 w-5" />
              <span>{program.duration}</span>
            </div>
            {program.equity && (
              <div className="flex items-center gap-1">
                <Contrast01Svg className="h-5 w-5" />
                <span>{program.equity}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Cube012Svg className="h-5 w-5" />
              <span>{program.chain}</span>
            </div>
            <div className="flex items-center gap-1">
              <MarkerPin013Svg className="h-5 w-5" />
              <span>{program.location}</span>
            </div>
          </div>
        </CardDescription>
        <Separator className="bg-ui-elements-light" />
        <CardFooter className="flex gap-4 p-6">
          <ExternalLink
            href={program.linkTree.website}
            className="w-full justify-center rounded-full border border-ui-elements-light bg-background-light px-4 py-2 text-center text-sm font-semibold text-text-primary"
          >
            View details
          </ExternalLink>
          <Button
            className="w-full px-4 py-2 disabled:bg-ui-elements-light"
            disabled={!program.open}
          >
            <ExternalLink
              href={program.href}
              className="text-md flex items-center justify-center gap-1 font-semibold text-text-primary"
            >
              <Send011Svg className="h-4 w-4" />
              <span>Apply</span>
            </ExternalLink>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
