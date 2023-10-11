import { Suspense } from "react";

export function ListPageLayout({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="w-full text-3xl font-semibold">{title}</h1>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
