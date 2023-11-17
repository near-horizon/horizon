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
import { getUserFromSession } from "~/lib/session";
import { getProfile } from "~/lib/fetching";

export async function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const user = await getUserFromSession();

  if (!user) {
    return <SignIn />;
  }

  const profile = await getProfile(user.accountId);

  if (mobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="group flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
          <Icon
            name={user.accountId}
            image={profile.image}
            className="h-8 w-8 rounded-full"
          />
          My profile
          <ChevronDownSvg className="h-4 w-4 rotate-180 transition-transform duration-200 group-data-[state='open']:rotate-0" />
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
            image={profile.image}
            className="h-8 w-8 rounded-full"
          />
          My profile
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={!user.hasProfile}>
            <Link href="/account/dashboard">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user.hasProfile}>
            <Link href="/account/requests">Requests</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user.hasProfile}>
            <Link href="/account/contracts">Contracts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user.hasProfile}>
            <Link href="/account/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
