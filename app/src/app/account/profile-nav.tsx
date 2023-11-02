"use client";

import { Fragment } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { NavItem } from "./nav-item";
import DotsGridIcon from "~/components/icons/dots-grid.svg";
import InboxIcon from "~/components/icons/inbox-01.svg";
import PersonIcon from "~/components/icons/user-01.svg";
import RequestIcon from "~/components/icons/request.svg";
import FlagIcon from "~/components/icons/flag-06.svg";
import WalletIcon from "~/components/icons/wallet-02.svg";
import RocketIcon from "~/components/icons/rocket-02.svg";
import UsersIcon from "~/components/icons/users-02.svg";
import SettingsIcon from "~/components/icons/settings-04.svg";
import TargetIcon from "~/components/icons/target-04.svg";
import { Separator } from "~/components/ui/separator";

const navigation = [
  {
    section: "dashboard",
    label: "Dashboard",
    icon: <DotsGridIcon className="h-5 w-5" />,
  },
  {
    section: "backers-digest",
    label: (
      <span className="flex w-full flex-row items-center justify-between">
        Backers digest
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6698 8.2C12.4398 7.9 12.1598 7.64 11.8998 7.38C11.2298 6.78 10.4698 6.35 9.82981 5.72C8.33982 4.26 8.00982 1.85 8.95982 0C8.00982 0.23 7.17982 0.75 6.46982 1.32C3.87982 3.4 2.85981 7.07 4.07981 10.22C4.11981 10.32 4.15981 10.42 4.15981 10.55C4.15981 10.77 4.00982 10.97 3.80982 11.05C3.57982 11.15 3.33982 11.09 3.14982 10.93C3.09272 10.8828 3.0452 10.8251 3.00982 10.76C1.87982 9.33 1.69982 7.28 2.45982 5.64C0.789815 7 -0.120185 9.3 0.00981533 11.47C0.0698153 11.97 0.129815 12.47 0.299815 12.97C0.439815 13.57 0.709815 14.17 1.00982 14.7C2.08982 16.43 3.95982 17.67 5.96982 17.92C8.10982 18.19 10.3998 17.8 12.0398 16.32C13.8698 14.66 14.5098 12 13.5698 9.72L13.4398 9.46C13.2298 9 12.6698 8.2 12.6698 8.2ZM9.50982 14.5C9.22982 14.74 8.76981 15 8.40981 15.1C7.28981 15.5 6.16982 14.94 5.50982 14.28C6.69982 14 7.40981 13.12 7.61981 12.23C7.78981 11.43 7.46982 10.77 7.33982 10C7.21982 9.26 7.23982 8.63 7.50982 7.94C7.69982 8.32 7.89982 8.7 8.13982 9C8.90981 10 10.1198 10.44 10.3798 11.8C10.4198 11.94 10.4398 12.08 10.4398 12.23C10.4698 13.05 10.1098 13.95 9.50982 14.5Z"
            fill="#FC9E1C"
            fillOpacity="0.9"
          />
        </svg>
      </span>
    ),
    icon: <TargetIcon className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "inbox",
    label: "Inbox",
    icon: <InboxIcon className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "profile",
    label: "Profile",
    icon: <PersonIcon className="h-5 w-5" />,
    subMenu: [
      { section: "basic", label: "Basic information", progress: 0.1 },
      { section: "tech", label: "Marketing & tech", progress: 0.1 },
      { section: "funding", label: "Funding", progress: 0.1 },
      { section: "founders", label: "Founders", progress: 0.1 },
      { section: "files", label: "Project files", progress: 0.1 },
    ],
    hasSeparator: true,
  },
  {
    section: "requests",
    label: "Your requests",
    icon: <RequestIcon className="h-5 w-5" />,
  },
  {
    section: "contracts",
    label: "Your contracts",
    icon: <FlagIcon className="h-5 w-5" />,
  },
  {
    section: "credits",
    label: "Credit balance",
    icon: <WalletIcon className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "growth",
    label: "Growth programs",
    icon: <RocketIcon className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "permissions",
    label: "Permissions",
    icon: <UsersIcon className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "settings",
    label: "Settings",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
] satisfies (Omit<
  Parameters<typeof NavItem>[0],
  "activeSection" | "activeSubSection"
> & { hasSeparator?: boolean })[];

export function ProfileNav() {
  return (
    <NavigationMenu
      orientation="vertical"
      className="w-full max-w-full [&>div]:w-full"
    >
      <NavigationMenuList className="flex w-full flex-col gap-3 px-3">
        {navigation.map(({ section: navSection, hasSeparator, ...props }) => (
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
