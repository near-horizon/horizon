import { Suspense } from "react";

export function ListPageLayout({
  title,
  children,
  fallback,
}: {
  title: string;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-8 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <h1 className="w-full text-3xl font-semibold">{title}</h1>
      <Suspense fallback={fallback ?? <div>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
