import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MainStats } from "~/components/main-stats";
import { getStats } from "~/lib/server/transactions";

export async function StatsLoader() {
  const queryClient = new QueryClient();
  const stats = await getStats();

  queryClient.setQueryData(["stats"], stats);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row items-center justify-between">
        <MainStats />
      </div>
    </HydrationBoundary>
  );
}
