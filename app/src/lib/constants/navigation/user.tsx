import { DotsGridSvg, RequestSvg, User01Svg, Wallet02Svg } from "~/icons";

export interface NavItemProps {
  section: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  subMenu?: {
    section: string;
    label: string;
    badge?: React.ReactNode;
  }[];
  badge?: React.ReactNode;
}

export type NavItemPropsWithSeparator = NavItemProps & {
  hasSeparator?: boolean;
};

export function getCommonMenu(...additional: NavItemPropsWithSeparator[]) {
  return [
    {
      section: "dashboard",
      label: "Dashboard",
      icon: <DotsGridSvg className="h-5 w-5" />,
    },
    {
      section: "profile",
      label: "Profile",
      icon: <User01Svg className="h-5 w-5" />,
      hasSeparator: true,
    },
    ...additional,
  ];
}

export const PROJECT_MENU = getCommonMenu(
  {
    section: "requests",
    label: "Your requests",
    icon: <RequestSvg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "credits",
    label: "Credit balance",
    icon: <Wallet02Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
);

export const CONTRIBUTOR_MENU = getCommonMenu(
  {
    section: "proposals",
    label: "Your proposals",
    icon: <RequestSvg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "credits",
    label: "Credit balance",
    icon: <Wallet02Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
);

export const BACKER_MENU = getCommonMenu();
