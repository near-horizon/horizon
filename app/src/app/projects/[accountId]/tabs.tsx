"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";

export function Tabs({ accountId }: { accountId: AccountId }) {
  const pathname = usePathname();
  const isOnRequests = pathname.includes("#requests");

  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <Link
        href={`/projects/${accountId}#profile`}
        className={cn(
          "rounded-lg bg-ui-elements-white px-4 py-2 text-sm font-medium text-ui-elements-black",
          isOnRequests && "bg-background-light text-background-dark",
        )}
      >
        Project profile
      </Link>
      <Link
        href={`/projects/${accountId}#requests`}
        className={cn(
          "rounded-lg bg-ui-elements-white px-4 py-2 text-sm font-medium text-ui-elements-black",
          !isOnRequests && "bg-background-light text-background-dark",
        )}
      >
        Requests
      </Link>
    </div>
  );
}
