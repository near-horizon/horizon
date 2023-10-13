import { Suspense } from "react";
import { PerksSkeleton } from "./skeleton";

export default function PerksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<PerksSkeleton />}>{children}</Suspense>;
}
