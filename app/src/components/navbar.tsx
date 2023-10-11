"use client";

import * as React from "react";
import Link from "next/link";
import { useSignIn, useSignOut, useWalletSelector } from "~/stores/global";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getImageURL } from "~/lib/fetching";
import { NavbarMobile } from "./navbar/mobile";
import { useProfile } from "~/hooks/fetching";
// import { NavbarDesktop } from "./navbar/desktop";

export function Navbar() {
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

  return (
    <header className="mx-auto flex max-w-screen-2xl flex-row justify-between px-2">
      {/* <div className="md:hidden"> */}
      <NavbarMobile />
      {/* </div> */}

      {/* <div className="hidden md:block"> */}
      {/*   <NavbarDesktop /> */}
      {/* </div> */}

      <div className="flex flex-row items-center justify-between gap-4 px-4">
        <ModeToggle />
        {isSignedIn ? (
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
                <Link href="/account">Profile</Link>
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
        ) : (
          <Button onClick={signIn}>Sign in</Button>
        )}
      </div>
    </header>
  );
}
