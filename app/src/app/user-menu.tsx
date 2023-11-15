"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useProfile } from "~/hooks/fetching";
import {
  useSignIn,
  useSignOut,
  useUser,
  useWalletSelector,
} from "~/stores/global";
import { ChevronDownSvg } from "~/icons";
import { ProfileNav } from "./account/profile-nav";
import { Icon } from "~/components/icon";

export function UserMenu() {
  const selector = useWalletSelector();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isSignedIn = selector?.isSignedIn();
  const user = useUser();
  const { data } = useProfile(user?.accountId, isSignedIn && !!user);

  if (!isSignedIn) {
    return (
      <div>
        <Button onClick={signIn} variant="outline">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-400">
            <Icon
              name={user?.accountId ?? ""}
              image={data?.image}
              className="h-8 w-8 rounded-lg"
            />
          </div>
          My profile
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={!user?.hasProfile}>
            <Link href="/account/dashboard">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user?.hasProfile}>
            <Link href="/account/requests">Requests</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user?.hasProfile}>
            <Link href="/account/contracts">Contracts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user?.hasProfile}>
            <Link href="/account/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
          <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function MobileUserMenu() {
  const selector = useWalletSelector();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isSignedIn = selector?.isSignedIn();
  const user = useUser();
  const { data } = useProfile(user?.accountId, isSignedIn && !!user);

  if (!isSignedIn) {
    return (
      <div>
        <Button onClick={signIn} variant="outline">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
        <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-400">
          <Icon
            name={user?.accountId ?? ""}
            image={data?.image}
            className="h-8 w-8 rounded-lg"
          />
        </div>
        My profile
        <ChevronDownSvg className="h-4 w-4 rotate-180 transition-transform duration-200 group-data-[state='open']:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-[100svw] flex-col items-stretch justify-start pt-6">
        {user?.hasProfile && <ProfileNav />}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={signOut}
          className="flex flex-row items-center justify-center"
        >
          <b className="text-center">Sign out</b>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
