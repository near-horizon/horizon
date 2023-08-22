interface Route {
  href: string;
  title: string;
  description: string;
}

export const routes: Route[] = [
  {
    href: "/projects",
    title: "Projects",
    description: "Projects registered on Horizon",
  },
  {
    href: "/requests",
    title: "Requests",
    description: "Requests from projects on Horizon",
  },
  {
    href: "/contributors",
    title: "Contributors",
    description: "Contributors registered on Horizon",
  },
  {
    href: "/backers",
    title: "Backers",
    description: "Backers registered on Horizon",
  },
];
