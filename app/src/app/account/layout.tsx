import { ProfileHeader } from "./profile-header";
import { WelcomeBanner } from "./welcome-banner";
import { ProfileNav } from "./profile-nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-row items-start justify-start">
      <div className="min-w-[240px] flex-grow-0">
        <ProfileNav />
      </div>
      <div className="flex max-w-[calc(100%-240px)] flex-grow flex-col items-start justify-start gap-6">
        <WelcomeBanner />
        <div className="w-full">
          <ProfileHeader />
        </div>
        <div className="w-full flex-grow">{children}</div>
      </div>
    </div>
  );
}
