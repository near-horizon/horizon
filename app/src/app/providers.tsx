"use client";

import "~/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import { setUser } from "~/stores/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { type IronSession } from "iron-session";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useWalletSelectorEffect } from "~/hooks/selector";
import { ProgressBar } from "./progress-bar";
import { Toaster } from "~/components/ui/toaster";
import { usePathname } from "next/navigation";
import { redirectOnboarding } from "~/lib/auth";
import { GTagScripts } from "./gtag";

export function Providers({
  children,
  user,
}: {
  children?: React.ReactNode;
  user?: IronSession["user"] | null;
}) {
  const [queryClient] = useState(() => new QueryClient());
  useWalletSelectorEffect();
  setUser(user ? user : undefined);
  useOnboardingRedirect({ user });

  return (
    <QueryClientProvider client={queryClient}>
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
