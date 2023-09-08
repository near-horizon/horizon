import { type AppType } from "next/dist/shared/lib/utils";
import { setUser } from "~/stores/global";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import { Dialog } from "~/components/ui/dialog";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Navbar } from "~/components/navbar";
import { type IronSession } from "iron-session";
import { MetaHead } from "~/components/meta/head";
import { Footer } from "~/components/footer";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useWalletSelectorEffect } from "~/hooks/selector";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  useWalletSelectorEffect();
  const { user } = pageProps as { user: IronSession["user"] };
  setUser(user);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Hydrate
          state={(pageProps as { dehydratedState: unknown }).dehydratedState}
        >
          <TooltipProvider>
            <Dialog>
              <MetaHead />
              <div className="flex min-h-[100dvh] flex-col ">
                <div className="mx-2 flex w-full max-w-[min(calc(100%-1rem),1536px)] flex-grow flex-col 2xl:mx-auto">
                  <Navbar />

                  <main className="w-full flex-grow">
                    <Component {...pageProps} />
                  </main>
                </div>

                <Footer />
              </div>
            </Dialog>
          </TooltipProvider>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
