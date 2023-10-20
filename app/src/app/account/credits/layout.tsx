import AvailableCreditsBanner from "./available-credits-banner";

import React, { Suspense } from "react";
import ContentTabs from "~/components/ui/content-tabs";
import AvailableCreditsBannerSkeleton from "./available-credits-banner-skeleton";
export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-black ">Credit balance</h2>
      <Suspense fallback={<AvailableCreditsBannerSkeleton />}>
        <AvailableCreditsBanner />
      </Suspense>
      <ContentTabs
        tabs={[
          {
            href: "/account/credits/activity",
            id: "activity",
            text: "Activity",
          },
          {
            href: "/account/credits/rewards",
            id: "rewards",
            text: "Rewards",
          },
          {
            href: "/account/credits/how-it-works",
            id: "how-it-works",
            text: "How it works",
          },
        ]}
      />
      {children}
    </div>
  );
}
