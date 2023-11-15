import { useQuery } from "@tanstack/react-query";
import { getGrowthPrograms } from "~/lib/client/growth-programs";

export function useGrowthPrograms() {
  return useQuery({
    queryKey: ["growthPrograms"],
    queryFn: getGrowthPrograms,
    initialData: [],
  });
}
