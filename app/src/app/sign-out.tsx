"use client";

import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useSignOut } from "~/stores/global";

export function SignOut({ mobile = false }: { mobile?: boolean }) {
  const signOut = useSignOut();

  if (mobile) {
    return (
      <DropdownMenuItem
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={signOut}
        className="flex flex-row items-center justify-center"
      >
        <b className="text-center">Sign out</b>
      </DropdownMenuItem>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>;
}
