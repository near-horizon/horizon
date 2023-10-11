import Logo from "../../public/logo.svg";
import { GlobalSearchBar } from "./global-search-bar";
import { NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex w-full flex-col items-start justify-start gap-4 pt-4">
      <div className="flex w-full flex-row items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <Logo className="w-full" />
        </Link>
        <GlobalSearchBar />
        <UserMenu />
      </div>
      <NavLinks />
    </header>
  );
}
