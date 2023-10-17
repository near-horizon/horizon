import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import ExternalLinkIcon from "~/components/icons/link-external-02.1.svg";
import { Separator } from "../ui/separator";
import { ExternalLink } from "../external-link";

import type { LearningResource } from "~/lib/validation/learn";

export function LearnCard({ resource }: { resource: LearningResource }) {
  return (
    <Card key={resource.title} className="flex h-full w-full shadow-md">
      <CardContent className="flex flex-1 flex-col p-0 ">
        <CardHeader className="mb-3 flex-1 p-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            {resource.title}
          </CardTitle>
        </CardHeader>

        <CardDescription className="text-md flex-1 p-4 pt-0 text-sm font-normal text-black">
          {resource.description}
        </CardDescription>
        <Separator className="bg-ui-elements-light" />
        <CardFooter className="justify-center pt-6">
          <ExternalLink href={resource.link} className="w-full">
            <div className="flex items-center justify-center rounded-full border border-ui-elements-light bg-background-light px-4 py-2">
              <span className="text-md mr-2 font-semibold">Learn more</span>
              <ExternalLinkIcon
                className="mt-[2px] h-4 w-4"
                viewBox="0 0 24 24"
              />
            </div>
          </ExternalLink>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
