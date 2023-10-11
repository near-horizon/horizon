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
import { getImageURL } from "~/lib/fetching";
import { useSignIn, useSignOut, useWalletSelector } from "~/stores/global";

export function UserMenu() {
  const selector = useWalletSelector();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isSignedIn = selector?.isSignedIn();
  const account = selector?.store.getState().accounts.at(0);
  const { data, isFetched } = useProfile(
    account?.accountId ?? "nearhorizon.near",
    isSignedIn && !!account
  );

  const image =
    isFetched && data?.image
      ? getImageURL((data?.image as Record<string, string>).ipfs_cid ?? "")
      : "";

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
      <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
        <div className="h-8 w-8 overflow-hidden rounded-lg border border-gray-400">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Profile picture"
            className="h-full w-full object-cover"
          />
        </div>
        My profile
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/account/dashboard">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account/requests">Requests</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account/contracts">Contracts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
        <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
