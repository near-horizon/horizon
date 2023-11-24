"use client";

import "~/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import { setUser } from "~/stores/global";
import { type IronSession } from "iron-session";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useWalletSelectorEffect } from "~/hooks/selector";
import { ProgressBar } from "~/providers/progress-bar";
import { Toaster } from "~/components/ui/toaster";
import { usePathname } from "next/navigation";
import { redirectOnboarding } from "~/lib/auth";
import { GTagScripts } from "~/providers/gtag";
import { QueryClientProvider } from "~/providers/query-client-provider";

export function Providers({
  children,
  user,
}: {
  children?: React.ReactNode;
  user?: IronSession["user"] | null;
}) {
  useWalletSelectorEffect();
  setUser(user ? user : undefined);
  useOnboardingRedirect({ user });

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

function useOnboardingRedirect({
  user,
}: {
  user?: IronSession["user"] | null;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname.includes("/onboarding");
  const isCreate = pathname.includes("/create");

  if (user && !(isOnboarding || isCreate) && !user.hasProfile) {
    return redirectOnboarding();
  }
}
