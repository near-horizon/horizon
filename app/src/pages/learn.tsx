import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";

import LinkExternal from "../components/icons/link-external-02.1.svg";

import { withSSRSession } from "~/lib/auth";

import {
  learningResources,
  SectionTitles,
  LearningResources,
} from "~/lib/constants/learning";

export default function Learn() {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-3xl font-bold tracking-wide text-gray-900">
        Learning resources
      </div>
      <div>{/* Filter components go here*/}</div>
      <div>
        {Object.keys(learningResources).map((resourceKey, i) => (
          <div key={resourceKey} className={`${i !== 0 ? "mt-14" : ""}`}>
            <h3 className="mb-8 text-2xl font-bold">
              {(SectionTitles as Record<string, SectionTitles>)[resourceKey]}
            </h3>
            <div className="flex flex-row flex-wrap items-stretch justify-start gap-8">
              {learningResources[resourceKey as keyof LearningResources].map(
                (resource) => (
                  <Card className="flex w-full shadow-md md:w-[calc((100%-.5rem)*.25)] lg:w-[calc((100%-1rem)*.30)] 2xl:w-[calc((100%-1.5rem)*.33)]">
                    <CardContent className="flex flex-1 flex-col p-0 ">
                      <CardHeader className="mb-3 flex-1 p-4">
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>

                      <CardDescription className="text-md flex-1  p-4 pt-0 text-sm font-normal text-black">
                        {resource.description}
                      </CardDescription>
                      <CardFooter className="border-t-[1px] pt-6">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={resource.link}
                          className="w-full rounded-full border border-[#e3e2e2] bg-[#ECEEF0] py-2 text-text-link"
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-md mr-2 font-semibold">
                              Learn more
                            </span>

                            <LinkExternal
                              className="mt-[2px] h-4  w-4"
                              viewBox="0 0 24 24"
                            />
                          </div>
                        </a>
                      </CardFooter>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withSSRSession(async function () {
  return { props: {} };
});
