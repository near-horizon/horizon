"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import {
  BookOpen02Svg,
  CalendarSvg,
  ChevronDownSvg,
  HomeLineSvg,
  LineChartUp02Svg,
  MagicWand02Svg,
  ProjectsSvg,
  RequestSvg,
  Shield011Svg,
  Users02Svg,
} from "~/icons";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { useUser } from "~/stores/global";
import { useHasBacker } from "~/hooks/backers";

const routes = [
  {
    name: (
      <>
        <HomeLineSvg className="h-4 w-4" />
        Home
      </>
    ),
    href: "/",
  },
  {
    name: (
      <>
        <ProjectsSvg className="h-4 w-4" />
        Projects
      </>
    ),
    href: "/projects",
  },
  {
    name: (
      <>
        <RequestSvg className="h-4 w-4" />
        Requests
      </>
    ),
    href: "/requests",
  },
  {
    name: (
      <>
        <Users02Svg className="h-4 w-4" />
        Contributors
      </>
    ),
    href: "/contributors",
  },
  {
    name: (
      <>
        <LineChartUp02Svg className="h-4 w-4" />
        Backers
      </>
    ),
    href: "/backers",
  },
  {
    name: (
      <>
        <MagicWand02Svg className="h-4 w-4" />
        Perks
      </>
    ),
    href: "/perks",
  },
  {
    name: (
      <>
        <CalendarSvg className="h-4 w-4" />
        Events
      </>
    ),
    href: "/events",
  },
  {
    name: (
      <>
        <BookOpen02Svg className="h-4 w-4" />
        Learn
      </>
    ),
    href: "/learn",
  },
];

export function NavLinks() {
  const [, section, sub] = usePathname()?.split("/");
  const user = useUser();
  const { data: isBacker } = useHasBacker(user?.accountId);

  return (
    <NavigationMenu
      orientation="horizontal"
      className="w-full max-w-full border border-x-0 border-ui-elements-light bg-background-white p-4"
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-start px-4">
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
          {isBacker && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/projects/backer-view"
                className={cn(
                  "flex flex-row items-center justify-start gap-2",
                  {
                    "text-text-link":
                      `/${section}/${sub}` === "/projects/backer-view",
                  }
                )}
              >
                <>
                  <ProjectsSvg className="h-4 w-4" />
                  Fundraisers
                </>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {user?.admin && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/admin"
                className={cn(
                  "flex flex-row items-center justify-start gap-2",
                  {
                    "text-text-link": `/${section}` === "/admin",
                  }
                )}
              >
                <>
                  <Shield011Svg className="h-4 w-4" />
                  Admin
                </>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

export function MobileNavLinks() {
  const [, section, sub] = usePathname()?.split("/");
  const user = useUser();
  const { data: isBacker } = useHasBacker(user?.accountId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
        Explore
        <ChevronDownSvg className="h-4 w-4 rotate-180 transition-transform duration-200 group-data-[state='open']:rotate-0" />
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
            {isBacker && (
              <>
                <Separator className="h-px w-full bg-ui-elements-light" />
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/projects/backer-view"
                    className={cn(
                      "flex flex-row items-center justify-start gap-2",
                      {
                        "text-text-link":
                          `/${section}/${sub}` === "/projects/backer-view",
                      }
                    )}
                  >
                    <>
                      <ProjectsSvg className="h-4 w-4" />
                      Fundraisers
                    </>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
            {user?.admin && (
              <>
                <Separator className="h-px w-full bg-ui-elements-light" />
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/admin"
                    className={cn(
                      "flex flex-row items-center justify-start gap-2",
                      {
                        "text-text-link": `/${section}` === "/admin",
                      }
                    )}
                  >
                    <>
                      <Shield011Svg className="h-4 w-4" />
                      Admin
                    </>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
