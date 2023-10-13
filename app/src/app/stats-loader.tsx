import getQueryClient from "./query-client";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { MainStats } from "~/components/main-stats";
import { getStats } from "~/lib/server/transactions";

export async function StatsLoader() {
  const queryClient = getQueryClient();
  const stats = await getStats();

  queryClient.setQueryData(["stats"], stats);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="flex flex-row items-center justify-between">
        <MainStats />
      </div>
    </Hydrate>
  );
}
