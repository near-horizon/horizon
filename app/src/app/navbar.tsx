import { IconSvg, LogoSvg } from "~/icons";
import { GlobalSearchBar } from "./global-search-bar";
import { MobileNavLinks, NavLinks } from "./nav-links";
import { MobileUserMenu, UserMenu } from "./user-menu";
import Link from "next/link";
import { cn } from "~/lib/utils";

export function Navbar() {
  return (
    <header className="flex w-full flex-col items-stretch justify-start gap-4 pt-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
        <Link href="/" className="flex items-center justify-center">
          <LogoSvg className="w-full" />
        </Link>
        <GlobalSearchBar />
        <UserMenu />
      </div>
      <NavLinks />
    </header>
  );
}

export function MobileNavbar() {
  return (
    <header
      className={cn(
        "flex w-full flex-col items-center justify-start gap-4",
        "rounded rounded-b-none border border-b-0 border-ui-elements-light bg-background-light py-4"
      )}
    >
      <div className="flex w-full flex-row items-center justify-between px-8">
        <div className="flex flex-row items-center justify-start">
          <Link href="/" className="flex items-center justify-center">
            <IconSvg className="h-8 w-full" />
          </Link>
          <MobileNavLinks />
        </div>
        <MobileUserMenu />
      </div>
      <GlobalSearchBar />
    </header>
  );
}
