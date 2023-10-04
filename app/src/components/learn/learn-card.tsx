import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";

import LinkExternal from "~/components/icons/link-external-02.1.svg";

import { LearningResource } from "~/lib/validation/learn";

export function LearnCard({ resource }: { resource: LearningResource }) {
  return (
    <Card
      key={resource.title}
      className="flex w-full shadow-md md:w-[calc((100%-.5rem)*.99)] lg:w-[calc((100%-1rem)*.45)] 2xl:w-[calc((100%-1.5rem)*.33)]"
    >
      <CardContent className="flex flex-1 flex-col p-0 ">
        <CardHeader className="mb-3 flex-1 p-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            {resource.title}
          </CardTitle>
        </CardHeader>

        <CardDescription className="text-md flex-1 p-4 pt-0 text-sm font-normal text-black">
          {resource.description}
        </CardDescription>
        <CardFooter className="border-t-[1px] pt-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={resource.link}
            className="w-full rounded-full border border-ui-elements-light bg-background-light py-2 text-text-link"
          >
            <div className="flex items-center justify-center">
              <span className="text-md mr-2 font-semibold">Learn more</span>

              <LinkExternal className="mt-[2px] h-4  w-4" viewBox="0 0 24 24" />
            </div>
          </a>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
