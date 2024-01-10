"use client";

import { LogoSvg } from "~/icons";
import { GlobalSearchBar } from "./global-search-bar";
import { MobileNavLinks, NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { Progress } from "~/components/ui/progress";
import { useOnboarding } from "~/stores/global";

export function Navbar() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </>
  );
}

export function DesktopNavbar() {
  const pathname = usePathname();
  const onboarding = useOnboarding();

  const isOnboarding = pathname.startsWith("/onboarding");

  if (isOnboarding) {
    return (
      <header className="relative flex w-full flex-col items-stretch justify-start gap-4 py-4">
        <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
          <Link href="#" className="flex items-center justify-center">
            <LogoSvg className="h-8 w-full" />
          </Link>
          <UserMenu />
        </div>
        <Progress
          value={((onboarding?.step ?? 0) * 100) / 7}
          className="absolute bottom-0 h-2 rounded-none bg-transparent"
        />
      </header>
    );
  }

  return (
    <header className="flex w-full flex-col items-stretch justify-start gap-4 pt-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
        <Link href="/" className="flex items-center justify-center">
          <LogoSvg className="h-8 w-full" />
        </Link>
        <GlobalSearchBar />
        <UserMenu />
      </div>
      <NavLinks />
    </header>
  );
}

export function MobileNavbar() {
  const pathname = usePathname();
  const onboarding = useOnboarding();

  const isOnboarding = pathname.startsWith("/onboarding");

  if (isOnboarding) {
    return (
      <header
        className={cn(
          "flex w-full flex-col items-center justify-start gap-4",
          "rounded rounded-b-none border border-b-0 border-ui-elements-light bg-ui-elements-white py-4",
          "relative shadow",
        )}
      >
        <div className="w-full px-8">
          <LogoSvg className="h-8" />
        </div>
        <Progress
          value={((onboarding?.step ?? 0) * 100) / 7}
          className="absolute bottom-0 h-2 rounded-none bg-transparent"
        />
      </header>
    );
  }

  return (
    <header
      className={cn(
        "flex w-full flex-col items-center justify-start gap-4",
        "rounded rounded-b-none border border-b-0 border-ui-elements-light bg-ui-elements-white py-4",
        "shadow",
      )}
    >
      <div className="flex w-full flex-row items-center justify-between px-8">
        <MobileNavLinks />
        <UserMenu mobile />
      </div>
      <GlobalSearchBar />
    </header>
  );
}
