"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Logo from "../../../public/logo.svg";
import CheckIcon from "~/components/icons/check-square-broken.1.svg";
import RocketIcon from "~/components/icons/rocket-02.svg";
import WalletIcon from "~/components/icons/wallet-02.svg";
import UsersIcon from "~/components/icons/users-01.svg";
import ChatIcon from "~/components/icons/message-chat-square.svg";
import BookIcon from "~/components/icons/book-open-02.svg";
import XIcon from "~/components/icons/x.svg";
import {
  setLocalStorageItem,
  useLocalStorageItem,
} from "~/hooks/local-storage";
import { z } from "zod";

const cards = [
  {
    icon: <CheckIcon className="h-7 w-7" />,
    title: "Get the jobs done",
    description: "Post your needs and find ecosystem experts to fulfill them.",
    cta: {
      text: "Create request",
      link: "/requests/create",
    },
    secondary: {
      text: "Browse contributors",
      link: "/contributors",
    },
  },
  {
    icon: <RocketIcon className="h-7 w-7" />,
    title: "Boost your growth",
    description:
      "Crypto ipsum bitcoin ethereum dogecoin litecoin. PancakeSwap.",
    cta: {
      text: "Join HZN cohort",
      link: "/hzn/join",
    },
    secondary: {
      text: "Learn about HZN",
      link: "/hzn",
    },
  },
  {
    icon: <WalletIcon className="h-7 w-7" />,
    title: "Earn and spend credits",
    description:
      "Crypto ipsum bitcoin ethereum dogecoin litecoin. PancakeSwap.",
    cta: {
      text: "Earn credits",
      link: "/account/credits",
    },
    secondary: {
      text: "Learn how credits work",
      link: "/account/credits/how",
    },
  },
  {
    icon: <UsersIcon className="h-7 w-7" />,
    title: "Join the community",
    description:
      "Crypto ipsum bitcoin ethereum dogecoin litecoin. PancakeSwap.",
    cta: {
      text: "Join discord",
      link: "/discord",
    },
  },
  {
    icon: <ChatIcon className="h-7 w-7" />,
    title: "Get in touch with us",
    description:
      "Crypto ipsum bitcoin ethereum dogecoin litecoin. PancakeSwap.",
    cta: {
      text: "Browse events",
      link: "/events",
    },
  },
  {
    icon: <BookIcon className="h-7 w-7" />,
    title: "Get educated",
    description:
      "Crypto ipsum bitcoin ethereum dogecoin litecoin. PancakeSwap.",
    cta: {
      text: "Browse learning resources",
      link: "/learn",
    },
  },
] satisfies Parameters<typeof Card>[0][];

export function WelcomeBanner() {
  const section = usePathname()?.split("/")[2];
  const isDashboard = section === "dashboard";
  const dismissed = useLocalStorageItem(
    "welcome-banner-dismissed",
    z.boolean()
  );

  return (
    <div
      className={cn(
        "relative flex max-w-full flex-col items-center justify-center gap-8 rounded-xl rounded-b-none border border-ui-elements-light bg-blue-100 py-8",
        {
          hidden: !isDashboard || dismissed,
        }
      )}
    >
      <Button
        variant="ghost"
        className="absolute right-0 top-0 hover:bg-transparent"
        onClick={() => {
          setLocalStorageItem("welcome-banner-dismissed", true);
        }}
      >
        <XIcon className="h-6 w-6" />
      </Button>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <h4 className="flex w-full flex-row justify-center gap-4 whitespace-nowrap text-2xl text-text-dark">
          Welcome to <Logo className="h-8" />
        </h4>
        <p className="text-ui-elements-black">
          Use these highlights to get started:
        </p>
      </div>
      <div className="hide-scroll-bar flex max-w-full flex-row items-start justify-start overflow-x-auto">
        <div className="flex flex-row items-stretch justify-start gap-4 px-8">
          {cards.map((props) => (
            <Card key={props.title} {...props} />
          ))}
        </div>
      </div>
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
        <Button
          variant="default"
          type="button"
          className="flex items-center justify-stretch"
        >
          <Link
            href={link}
            className="flex w-full items-center justify-center text-center"
          >
            {text}
          </Link>
        </Button>
        <Button
          variant="outline"
          type="button"
          className={cn("flex items-stretch justify-stretch", {
            "!opacity-0": !secondary,
          })}
          disabled={!secondary}
        >
          {secondary && (
            <Link
              href={secondary.link}
              className="flex w-full items-center justify-center text-center"
            >
              {secondary.text}
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
}
