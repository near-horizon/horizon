"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { CheckSquareBroken1Svg, LogoSvg, Rocket02Svg, XSvg } from "~/icons";
import {
  setLocalStorageItem,
  useLocalStorageItem,
} from "~/hooks/local-storage";
import { z } from "zod";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const cards = [
  {
    icon: <CheckSquareBroken1Svg className="h-7 w-7" />,
    title: "Find talent",
    description:
      "Work with a network of professionals — both organizations and freelancers.",
    cta: {
      text: "Create request",
      link: "/requests/create",
    },
    secondary: {
      text: "Browse professionals",
      link: "/contributors",
    },
  },
  {
    icon: <Rocket02Svg className="h-7 w-7" />,
    title: "Join our accelerator",
    description: "Join our premier accelerator for Founders",
    cta: {
      text: "Apply to HZN accelerator",
      link: "https://hzn.xyz/hzn/signup",
    },
    secondary: {
      text: "Learn about HZN",
      link: "https://hzn.xyz/hzn",
    },
  },
] satisfies Parameters<typeof Card>[0][];

export function WelcomeBanner() {
  const section = usePathname()?.split("/")[2];
  const isDashboard = section === "dashboard";
  const dismissed = useLocalStorageItem(
    "welcome-banner-dismissed",
    z.boolean(),
  );

  return (
    <div
      className={cn(
        "relative flex max-w-full flex-col items-center justify-center gap-8 rounded-xl",
        "w-full border border-ui-elements-light bg-blue-100 py-8 md:max-w-screen-lg",
        {
          hidden: !isDashboard || dismissed,
        },
      )}
    >
      <Button
        variant="ghost"
        className="absolute right-0 top-0 hover:bg-transparent"
        onClick={() => {
          setLocalStorageItem("welcome-banner-dismissed", true);
        }}
      >
        <XSvg className="h-6 w-6" />
      </Button>

      <div className="flex w-full flex-col items-center justify-center gap-3">
        <h4 className="flex w-full flex-row justify-center gap-4 whitespace-nowrap text-2xl text-text-dark">
          Welcome to <LogoSvg className="h-8" />
        </h4>
        <p className="text-ui-elements-black">Start here:</p>
      </div>

      <ScrollArea className="max-w-full">
        <div className="flex flex-row items-stretch justify-start gap-4 px-8">
          {cards.map((props) => (
            <Card key={props.title} {...props} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function Card({
  icon,
  title,
  description,
  cta: { text, link },
  secondary,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: { link: string; text: string };
  secondary?: { link: string; text: string };
}) {
  return (
    <div className="flex w-[18.5rem] flex-col items-center justify-between gap-8 rounded-2xl bg-ui-elements-white px-8 py-6">
      <div className="flex w-full flex-grow flex-col items-center justify-start gap-3 text-ui-elements-black">
        {icon}
        <h5 className="text-xl font-bold">{title}</h5>
        <p className="text-center text-sm">{description}</p>
      </div>
      <div className="flex flex-grow-0 flex-col items-stretch justify-center gap-2">
        <Link href={link} className="w-full">
          <Button
            variant="default"
            type="button"
            className="flex w-full items-center justify-center"
          >
            {text}
          </Button>
        </Link>

        {secondary && (
          <Link href={secondary.link} className="w-full">
            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center justify-center"
            >
              {secondary.text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
