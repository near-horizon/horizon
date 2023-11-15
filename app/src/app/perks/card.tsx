"use client";

import { type Perk } from "~/lib/validation/perks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tags } from "~/components/tags";
import { CTA } from "~/components/perk/cta";
import { CheckSquareSvg, Copy03Svg, SquareSvg } from "~/icons";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import Image from "next/image";

const requirementMapping = {
  "profile-created": "Create Profile",
  "profile-completed": "Complete Profile Overview",
};

export function Perk(perk: Perk & { noButton?: boolean }) {
  const {
    fields: {
      name,
      logo: [logo],
      description,
      category,
      benefit,
      instructions,
      price,
    },
    code,
    requirements,
  } = perk;
  const completedCount = requirements?.filter(
    ({ completed }) => completed
  ).length;
  const requirementsMet =
    completedCount === requirements?.length && !perk.noButton;

  return (
    <Card className="flex h-full flex-col items-stretch justify-between">
      <CardHeader className="flex-grow-0">
        <CardTitle className="flex h-12 w-full flex-row items-center justify-between">
          <span>{name}</span>
          <div className="relative h-full w-20 object-contain">
            <Image
              src={logo?.url ?? ""}
              alt={name}
              fill
              unoptimized
              objectFit="contain"
              objectPosition="right"
            />
          </div>
        </CardTitle>
        <CardDescription>
          {description}
          <Tags tags={category} loading={false} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-4">
        <div className="flex flex-col items-start justify-start gap-2 rounded-lg border border-dashed border-[#C0AB8B] bg-gradient-to-b from-[#FCFBE9] to-[rgba(252,251,233,0.00)] px-3 py-2">
          <h4 className="text-sm font-semibold text-ui-elements-dark">
            Benefit
          </h4>
          <p className="text-sm font-normal text-gray-900">{benefit}</p>
        </div>
        {requirementsMet ? (
          <>
            <Section title="How to claim">
              <ul className="flex list-inside list-disc flex-col gap-1">
                {instructions
                  .split("\n")
                  .filter((line) => line.trim().length)
                  .map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                {code ? (
                  <li>
                    Enter the code{" "}
                    <button
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="inline-flex flex-row border-none bg-none"
                    >
                      <span className="inline-block rounded-md bg-[#EAECF5] px-1 text-sm font-medium text-ui-elements-dark">
                        {code}
                      </span>
                      <Copy03Svg className="ml-2 h-4 w-4 text-text-link" />
                    </button>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </Section>
            {price > 0 && (
              <Section title="Required credits:" row>
                <span className="ml-2 text-sm font-semibold text-ui-elements-dark">
                  {price} NHZN
                </span>
              </Section>
            )}
          </>
        ) : (
          <Section title="Eligibility criteria">
            {requirements?.map(({ requirement, completed }, index) => (
              <div key={requirement}>
                {!completed ? (
                  <SquareSvg className="h-4 w-4 text-[#A8ACB3]" />
                ) : (
                  <CheckSquareSvg className="h-4 w-4 text-primary-pressed" />
                )}
                <span
                  className={cn("text-sm font-normal text-ui-elements-gray", {
                    "line-through": completed,
                    "text-text-link": index === completedCount,
                  })}
                >
                  {
                    requirementMapping[
                      requirement as keyof typeof requirementMapping
                    ]
                  }
                </span>
              </div>
            ))}
          </Section>
        )}
      </CardContent>
      <Separator className="mb-3 h-px w-full bg-ui-elements-light" />
      <CardFooter className="flex-grow-0">
        {!perk.noButton && <CTA {...perk} />}
      </CardFooter>
    </Card>
  );
}

function Section({
  title,
  row,
  children,
}: {
  title: string;
  row?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", { "flex-row": row })}>
      <h4 className="text-sm font-semibold text-ui-elements-dark">{title}</h4>
      {children}
    </div>
  );
}

export function PerkSkeleton() {
  return (
    <Card className="flex h-full flex-col items-stretch justify-between">
      <CardHeader className="flex-grow-0">
        <CardTitle className="flex max-h-8 w-full flex-row items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-12 rounded-xl" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />
          <Skeleton className="mt-4 h-4 w-24 max-w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col items-start justify-start gap-2 rounded-lg border border-dashed border-[#C0AB8B] bg-gradient-to-b from-[#FCFBE9] to-[rgba(252,251,233,0.00)] px-3 py-2">
          <h4 className="text-sm font-semibold text-ui-elements-dark">
            Benefit
          </h4>
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Section title="Eligibility criteria">
          <Skeleton className="h-4 w-96 max-w-full" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />
        </Section>
      </CardContent>
      <Separator className="mb-3 h-px w-full bg-ui-elements-light" />
      <CardFooter className="flex flex-grow-0 flex-row items-center justify-center">
        <Skeleton className="h-10 w-56 rounded-full" />
      </CardFooter>
    </Card>
  );
}
