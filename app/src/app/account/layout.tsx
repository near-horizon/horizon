import { ProfileNav } from "./profile-nav";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return redirect("/login");
  }

  if (!user.hasProfile) {
    return redirect("/onboarding");
  }

  return (
    <div className="relative flex h-full w-full flex-row items-start justify-start">
      <div className="sticky top-4 hidden min-w-[14rem] flex-grow-0 md:block">
        <ProfileNav />
      </div>
      <div className="flex max-w-full flex-grow flex-col items-center justify-start gap-6 px-8 pb-12 md:max-w-screen-lg">
        {children}
      </div>
    </div>
  );
}
