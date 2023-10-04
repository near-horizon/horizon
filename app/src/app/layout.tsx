import { Providers } from "./providers";
import { Navbar } from "~/components/navbar";
import { getUserFromSession } from "~/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  return (
    <html lang="en">
      <body>
        <Providers user={user}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
