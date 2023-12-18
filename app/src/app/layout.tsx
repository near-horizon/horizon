// style imports
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";

import { Footer } from "~/components/footer";
import { MobileNavbar, Navbar } from "./navbar";
import { Providers } from "./providers";
import { getUserFromSession } from "~/lib/session";
import { type Metadata } from "next";
import { HZNBanner } from "~/components/banners/hzn";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  return (
    <html lang="en">
      <body className="flex h-[100svh] flex-col">
        <HZNBanner />
        <Providers user={user}>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
          <div className="w-full flex-grow bg-background-light">
            <main className="mx-auto h-full w-full max-w-screen-xl flex-grow bg-background-light pb-16 pt-8">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "NEAR Horizon",
  description: "Explore NEAR Horizon",
  category: "web3",
  keywords: ["near", "horizon", "growth", "projects", "web3"],
  applicationName: "NEAR Horizon",
};
