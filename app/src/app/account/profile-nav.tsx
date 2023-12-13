"use client";

import { Fragment } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { NavItem } from "./nav-item";
import { Separator } from "~/components/ui/separator";
import {
  BACKER_MENU,
  CONTRIBUTOR_MENU,
  PROJECT_MENU,
} from "~/lib/constants/navigation/user";
import { useUser } from "~/stores/global";

export function ProfileNav() {
  const user = useUser();

  let items = PROJECT_MENU;

  if (!user.logedIn) {
    return <></>;
  }

  if (user.hasProfile && user.profileType === "contributor") {
    items = CONTRIBUTOR_MENU;
  } else if (user.hasProfile && user.profileType === "backer") {
    items = BACKER_MENU;
  }

  return (
    <NavigationMenu
      orientation="vertical"
      className="w-full max-w-full [&>div]:w-full"
    >
      <NavigationMenuList className="flex w-full flex-col gap-3 px-3">
        {items.map(({ section: navSection, hasSeparator, ...props }) => (
          <Fragment key={navSection}>
            {hasSeparator && (
              <Separator className="h-px w-full bg-ui-elements-light" />
            )}
            <NavItem section={navSection} {...props} />
          </Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
