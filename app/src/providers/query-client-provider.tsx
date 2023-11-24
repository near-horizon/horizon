"use client";

import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { useState } from "react";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return <QCP client={queryClient}>{children}</QCP>;
}
