"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDownSvg } from "~/icons";
import { ProfileNav } from "./account/profile-nav";
import { Icon } from "~/components/icon";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { useUser } from "~/stores/global";
import { useProfile } from "~/hooks/fetching";

export function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const user = useUser();
  const { data: profile } = useProfile(
    user.logedIn ? user.accountId : undefined,
  );

  if (!user.logedIn) {
    return <SignIn />;
  }

  if (mobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="group flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
          <Icon
            name={user.accountId}
            image={profile?.image}
            className="h-8 w-8 rounded-full"
          />
          Profile
          <ChevronDownSvg className="h-4 w-4 rotate-0 transition-transform duration-200 group-data-[state='open']:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-[100svw] flex-col items-stretch justify-start pt-6">
          {user.hasProfile && <ProfileNav />}
          <DropdownMenuSeparator />
          <SignOut mobile />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-row items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
          <Icon
            name={user.accountId}
            image={profile?.image}
            className="h-8 w-8 rounded-full"
          />
          My profile
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserMenuItem
            href="/account/dashboard"
            text="Profile"
            disabled={!user.hasProfile}
          />
          <UserMenuItem
            href="/account/requests"
            text="Requests"
            disabled={!user.hasProfile}
          />
          <UserMenuItem
            href="/account/contracts"
            text="Contracts"
            disabled={!user.hasProfile}
          />
          <UserMenuItem
            href="/account/settings"
            text="Settings"
            disabled={!user.hasProfile}
          />
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function UserMenuItem({
  href,
  text,
  disabled = false,
}: {
  href: string;
  text: string;
  disabled: boolean;
}) {
  return (
    <DropdownMenuItem disabled={disabled}>
      <Link href={href}>{text}</Link>
    </DropdownMenuItem>
  );
}
