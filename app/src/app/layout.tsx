import { Footer } from "~/components/footer";
import { MobileNavbar, Navbar } from "./navbar";
import { Providers } from "./providers";
import { getUserFromSession } from "~/lib/session";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  return (
    <html lang="en">
      <body className="flex h-[100svh] flex-col">
        <Providers user={user}>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
          <div className="w-full flex-grow bg-background-light">
            <main className="mx-auto h-full w-full max-w-screen-xl flex-grow bg-background-light pb-[5.375rem] pt-8">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
