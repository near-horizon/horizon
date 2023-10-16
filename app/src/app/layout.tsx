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
          <div className="mx-auto w-full max-w-screen-xl flex-grow">
            <div className="hidden md:block">
              <Navbar />
            </div>
            <div className="md:hidden">
              <MobileNavbar />
            </div>
            <main className="h-full flex-grow border border-b-0 border-ui-elements-light px-9 pb-[5.375rem] pt-8">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
