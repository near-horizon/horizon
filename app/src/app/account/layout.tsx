import { ProfileHeader } from "./profile-header";
import { WelcomeBanner } from "./welcome-banner";
import { ProfileNav } from "./profile-nav";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return redirect("/login");
  }

  return (
    <div className="flex h-full w-full flex-row items-stretch justify-start">
      <div className="hidden min-w-[240px] flex-grow-0 md:block">
        <ProfileNav />
      </div>
      <div className="flex max-w-full flex-grow flex-col items-start justify-start gap-6 bg-ui-elements-white md:max-w-[calc(100%-240px)]">
        <WelcomeBanner />
        <div className="w-full flex-grow px-8 pb-12 pt-10">
          <ProfileHeader accountId={user.accountId} />
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
