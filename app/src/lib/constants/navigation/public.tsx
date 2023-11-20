import {
  BookOpen02Svg,
  CalendarSvg,
  HomeLineSvg,
  LineChartUp02Svg,
  MagicWand02Svg,
  ProjectsSvg,
  RequestSvg,
  Users02Svg,
} from "~/icons";

interface Route {
  href: string;
  name: React.ReactNode;
}

export const routes = [
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
] satisfies Route[];
