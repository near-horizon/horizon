import { Suspense } from "react";
import { PerksSkeleton } from "./skeleton";

export default function PerksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-8 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <Suspense fallback={<PerksSkeleton />}>{children}</Suspense>
    </div>
  );
}
