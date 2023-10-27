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
import ChevronDownIcon from "~/components/icons/chevron-down.svg";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";

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
      className="w-full max-w-full border border-x-0 border-ui-elements-light bg-background-white p-4"
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-start">
        <NavigationMenuList className="flex w-full flex-row gap-6">
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <NavigationMenuLink
                href={route.href}
                className={cn(
                  "flex flex-row items-center justify-start gap-2",
                  {
                    "text-text-link": `/${section}` === route.href,
                  }
                )}
              >
                {route.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

export function MobileNavLinks() {
  const section = usePathname()?.split("/")[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
        Explore
        <ChevronDownIcon className="h-4 w-4 rotate-180 transition-transform duration-200 group-data-[state='open']:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100svw] origin-left p-0">
        <NavigationMenu
          orientation="vertical"
          className="w-full max-w-screen-lg items-center justify-start rounded rounded-b-none border border-b-0 border-ui-elements-light bg-background-light p-4 [&>div]:w-full"
        >
          <NavigationMenuList className="flex w-full flex-col items-start gap-4">
            {routes.reduce((list, route) => {
              if (list.length > 0) {
                list.push(
                  <Separator
                    key={`${route.href}-${list.length}`}
                    className="h-px w-full bg-ui-elements-light"
                  />
                );
              }

              list.push(
                <NavigationMenuItem key={route.href}>
                  <NavigationMenuLink
                    href={route.href}
                    className={cn(
                      "flex w-full flex-row items-center justify-start gap-2",
                      {
                        "text-text-link": `/${section}` === route.href,
                      }
                    )}
                  >
                    {route.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );

              return list;
            }, new Array<ReactNode>(0))}
          </NavigationMenuList>
        </NavigationMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
