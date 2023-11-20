import {
  DotsGridSvg,
  Flag06Svg,
  Inbox01Svg,
  RequestSvg,
  Rocket02Svg,
  Settings04Svg,
  User01Svg,
  Users02Svg,
  Wallet02Svg,
} from "~/icons";

export interface NavItemProps {
  section: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  subMenu?: {
    section: string;
    label: string;
    progress: number;
  }[];
  count?: number;
}

export type NavItemPropsWithSeparator = NavItemProps & {
  hasSeparator?: boolean;
};

export const USER_MENU = [
  {
    section: "dashboard",
    label: "Dashboard",
    icon: <DotsGridSvg className="h-5 w-5" />,
  },
  {
    section: "inbox",
    label: "Inbox",
    icon: <Inbox01Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "profile",
    label: "Profile",
    icon: <User01Svg className="h-5 w-5" />,
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
    icon: <RequestSvg className="h-5 w-5" />,
  },
  {
    section: "contracts",
    label: "Your contracts",
    icon: <Flag06Svg className="h-5 w-5" />,
  },
  {
    section: "credits",
    label: "Credit balance",
    icon: <Wallet02Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "growth",
    label: "Growth programs",
    icon: <Rocket02Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "permissions",
    label: "Permissions",
    icon: <Users02Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "settings",
    label: "Settings",
    icon: <Settings04Svg className="h-5 w-5" />,
  },
] satisfies NavItemPropsWithSeparator[];
