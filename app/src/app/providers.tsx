"use client";
import { setUser } from "~/stores/global";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import { Dialog } from "~/components/ui/dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { type IronSession } from "iron-session";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useWalletSelectorEffect } from "~/hooks/selector";

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

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Dialog>{children}</Dialog>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
