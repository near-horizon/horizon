import { ContributorBadge, ProjectBadge } from "~/app/account/badges";
import {
  DotsGridSvg,
  Flag06Svg,
  Inbox01Svg,
  RequestSvg,
  Rocket02Svg,
  Settings04Svg,
  Target04Svg,
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
      section: "inbox",
      label: "Inbox",
      icon: <Inbox01Svg className="h-5 w-5" />,
      hasSeparator: true,
    },
    ...additional,
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
  ];
}

export const PROJECT_MENU = getCommonMenu(
  {
    section: "profile",
    label: "Profile",
    icon: <User01Svg className="h-5 w-5" />,
    subMenu: [
      {
        section: "basic",
        label: "Basic information",
        badge: <ProjectBadge metric="basic" />,
      },
      {
        section: "tech",
        label: "Marketing & tech",
        badge: <ProjectBadge metric="tech" />,
      },
      {
        section: "funding",
        label: "Funding",
        badge: <ProjectBadge metric="funding" />,
      },
      {
        section: "founders",
        label: "Founders",
        badge: <ProjectBadge metric="founders" />,
      },
      {
        section: "files",
        label: "Project files",
        badge: <ProjectBadge metric="files" />,
      },
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
  }
);

export const PROJECT_MENU_DIGEST = getCommonMenu(
  {
    section: "backers-digest",
    label: "Backers digest",
    badge: (
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
    ),
    icon: <Target04Svg className="h-5 w-5" />,
    hasSeparator: true,
  },
  {
    section: "profile",
    label: "Profile",
    icon: <User01Svg className="h-5 w-5" />,
    subMenu: [
      {
        section: "basic",
        label: "Basic information",
        badge: <ProjectBadge metric="basic" />,
      },
      {
        section: "tech",
        label: "Marketing & tech",
        badge: <ProjectBadge metric="tech" />,
      },
      {
        section: "funding",
        label: "Funding",
        badge: <ProjectBadge metric="funding" />,
      },
      {
        section: "founders",
        label: "Founders",
        badge: <ProjectBadge metric="founders" />,
      },
      {
        section: "files",
        label: "Project files",
        badge: <ProjectBadge metric="files" />,
      },
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
  }
);

export const CONTRIBUTOR_MENU = getCommonMenu(
  {
    section: "profile",
    label: "Profile",
    icon: <User01Svg className="h-5 w-5" />,
    subMenu: [
      {
        section: "basic",
        label: "Basic information",
        badge: <ContributorBadge metric="basic" />,
      },
      {
        section: "portfolio",
        label: "Portfolio",
        badge: <ContributorBadge metric="portfolio" />,
      },
    ],
    hasSeparator: true,
  },
  {
    section: "proposals",
    label: "Your proposals",
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
  }
);

export const BACKER_MENU = getCommonMenu({
  section: "profile",
  label: "Profile",
  icon: <User01Svg className="h-5 w-5" />,
  hasSeparator: true,
});
