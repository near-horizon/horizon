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
import { Separator } from "~/components/ui/separator";

const navigation = [
  {
    section: "dashboard",
    label: "Dashboard",
    icon: <DotsGridIcon className="h-5 w-5" />,
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
