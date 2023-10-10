import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";

import RocketIcon from "~/components/icons/rocket-02.svg";
import SendIcon from "~/components/icons/send-01.1.svg";
import { Tags } from "~/components/tags";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { ExternalLink } from "~/components/external-link";
import { Button } from "~/components/ui/button";
import { GrowthProgram } from "~/lib/validation/growth-programs";

export default function GrowthProgramCard({
  program,
}: {
  program: GrowthProgram;
}) {
  return (
    <Card className="flex w-full shadow-md md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-4rem)/3)] 2xl:w-[calc((100%-6rem)/4)]">
      <CardContent className="px-0 pb-0">
        <CardHeader className="flex flex-row items-center px-6">
          {program.imageSvg ? null : (
            <img
              src={program.imageSrc}
              alt={`${program.name} Brand`}
              className="mr-4 h-16 w-16 object-contain"
            />
          )}
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
        <CardDescription className="p-6 pt-0">
          <div className="mb-3 text-sm font-normal tracking-wide text-ui-elements-dark">
            {program.tagLine}
          </div>

          <Tags tags={program.tags} loading={false} />
          <div className="mt-3 flex flex-wrap gap-6">
            <div className="flex items-center gap-1">
              <RocketIcon className="h-5 w-5" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <RocketIcon className="h-5 w-5" />
              <span>{program.equity}</span>
            </div>
            <div className="flex items-center gap-1">
              <RocketIcon className="h-5 w-5" />
              <span>{program.chain}</span>
            </div>
            <div className="flex items-center gap-1">
              <RocketIcon className="h-5 w-5" />
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
              className="text-md font-semibold text-text-primary"
            >
              <div className="flex items-center justify-center gap-1">
                <SendIcon className="h-4 w-4" viewBox="0 0 24 24" />
                <span>Apply</span>
              </div>
            </ExternalLink>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
