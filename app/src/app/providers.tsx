"use client";

import { setUser } from "~/stores/global";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useWalletSelectorEffect } from "~/hooks/selector";
import { ProgressBar } from "~/providers/progress-bar";
import { Toaster } from "~/components/ui/toaster";
import { usePathname } from "next/navigation";
import { redirectOnboarding } from "~/lib/auth";
import { GTagScripts } from "~/providers/gtag";
import { QueryClientProvider } from "~/providers/query-client-provider";
import { type User } from "~/lib/validation/user";

export function Providers({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: User;
}) {
  useWalletSelectorEffect();
  setUser(user);
  useOnboardingRedirect(user);

  return (
    <QueryClientProvider>
      <TooltipProvider>
        <ProgressBar>{children}</ProgressBar>
        <Toaster />
        <GTagScripts />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function useOnboardingRedirect(user: User) {
  const pathname = usePathname();
  const isOnboarding = pathname.includes("/onboarding");
  const isCreate = pathname.includes("/create");

  if (!(isOnboarding || isCreate) && user.loggedIn && !user.hasProfile) {
    return redirectOnboarding();
  }
}
