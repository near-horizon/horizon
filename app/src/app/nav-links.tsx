"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import HomeIcon from "~/components/icons/home-line.svg";
import ProjectsIcon from "~/components/icons/projects.svg";
import RequestsIcon from "~/components/icons/request.svg";
import ContributorsIcon from "~/components/icons/users-02.svg";
import LineChartIcon from "~/components/icons/line-chart-up-02.svg";
import MagicWandIcon from "~/components/icons/magic-wand-02.svg";
import CalendarIcon from "~/components/icons/calendar.svg";
import LearnIcon from "~/components/icons/book-open-02.svg";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const routes = [
  {
    name: (
      <>
        <HomeIcon className="h-4 w-4" />
        Home
      </>
    ),
    href: "/",
  },
  {
    name: (
      <>
        <ProjectsIcon className="h-4 w-4" />
        Projects
      </>
    ),
    href: "/projects",
  },
  {
    name: (
      <>
        <RequestsIcon className="h-4 w-4" />
        Requests
      </>
    ),
    href: "/requests",
  },
  {
    name: (
      <>
        <ContributorsIcon className="h-4 w-4" />
        Contributors
      </>
    ),
    href: "/contributors",
  },
  {
    name: (
      <>
        <LineChartIcon className="h-4 w-4" />
        Backers
      </>
    ),
    href: "/backers",
  },
  {
    name: (
      <>
        <MagicWandIcon className="h-4 w-4" />
        Perks
      </>
    ),
    href: "/perks",
  },
  {
    name: (
      <>
        <CalendarIcon className="h-4 w-4" />
        Events
      </>
    ),
    href: "/events",
  },
  {
    name: (
      <>
        <LearnIcon className="h-4 w-4" />
        Learn
      </>
    ),
    href: "/learn",
  },
];

export function NavLinks() {
  const section = usePathname()?.split("/")[1];

  return (
    <NavigationMenu
      orientation="horizontal"
      className="w-full max-w-[100%] justify-start rounded rounded-b-none border border-b-0 border-ui-elements-light bg-background-light p-4"
    >
      <NavigationMenuList className="flex flex-row gap-4">
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            <NavigationMenuLink
              href={route.href}
              className={cn("flex flex-row items-center justify-start gap-2", {
                "text-text-link": `/${section}` === route.href,
              })}
            >
              {route.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
