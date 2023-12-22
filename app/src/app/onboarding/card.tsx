"use client";

import { cn } from "~/lib/utils";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { LineChartUp02Svg, Rocket02Svg, Users02Svg } from "~/icons";
import { startOnboarding } from "~/stores/global";

const choices = [
  {
    icon: <Rocket02Svg className="w-8" />,
    title: "Web3 Founder",
    value: "project",
    bullets: [
      "Hire ecosystem experts",
      "Meet with fellow founders",
      "Join accelerator",
      "Get financial support",
      "Get investments",
    ],
    link: "/onboarding/project",
    linkText: "Create project profile",
    focus: true,
  },
  {
    icon: <Users02Svg className="w-8" />,
    title: "Contributor",
    value: "contributor",
    bullets: [
      "Offer your services to projects",
      "Build customer base and reputation",
      "Earn and grow your business",
    ],
    link: "/onboarding/contributor",
    linkText: "Create contributor profile",
  },
  {
    icon: <LineChartUp02Svg className="w-8" />,
    title: "Backer",
    value: "backer",
    bullets: [
      "Find promising projects on early stages",
      "Grow your portfolio",
      "Reduce risks and costs",
    ],
    link: "/onboarding/backer",
    linkText: "Create backer profile",
  },
];

export function Card({
  icon,
  title,
  bullets,
  link,
  linkText,
  focus = false,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  link: string;
  linkText: string;
  focus?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  }, [ref, focus]);

  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-between gap-8 px-8 py-6",
        "rounded-xl border-ui-elements-light bg-background-white shadow shadow-ui-elements-light transition-all duration-500 hover:shadow-ui-elements-gray",
      )}
    >
      <div className="flex w-full flex-col items-center justify-start gap-3">
        {icon}
        <h4 className="text-lg font-bold text-text-black">{title}</h4>
        <ul className="flex list-disc flex-col items-start justify-start gap-1 text-sm font-normal text-ui-elements-black">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <Button
        variant="default"
        className={cn(
          "border border-ui-elements-light bg-white transition-all duration-500 group-hover:border-primary group-hover:bg-primary",
        )}
      >
        <input type="hidden" ref={ref} autoFocus={focus} />
        <Link href={link}>{linkText}</Link>
      </Button>
    </div>
  );
}

export function RadioCard({
  icon,
  title,
  bullets,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  value: string;
}) {
  return (
    <RadioGroupItem
      value={value}
      className={cn(
        "flex flex-col items-center justify-start gap-3 rounded-2xl bg-ui-elements-white shadow-md shadow-ui-elements-gray",
        "border-8 border-ui-elements-white data-[state=checked]:border-primary",
        "h-full w-full p-8 pt-6 transition-all duration-300",
      )}
    >
      {icon}
      <h4 className="text-lg font-bold text-text-black">{title}</h4>
      <ul className="flex list-disc flex-col items-start justify-start gap-1 text-sm font-normal text-ui-elements-black">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </RadioGroupItem>
  );
}

export function Cards() {
  return (
    <>
      {choices.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </>
  );
}

const formSchema = z.object({
  type: z.enum(["project", "contributor", "backer"]),
});

export function RadioGroupChoices() {
  const form = useZodForm(formSchema, {
    defaultValues: {
      type: "project",
    },
  });
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center justify-center gap-6"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((data) => {
          startOnboarding(data.type);
          router.push(`/onboarding/${data.type}`);
        })}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-3 gap-7"
                  defaultValue={field.value as string}
                  onChange={field.onChange}
                >
                  {choices.map((choice) => (
                    <FormItem key={choice.title}>
                      <RadioCard {...choice} />
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" variant="default">
          Get started
        </Button>
      </form>
    </Form>
  );
}
