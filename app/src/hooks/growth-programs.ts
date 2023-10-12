import { useQuery } from "@tanstack/react-query";
import { getGrowthPrograms } from "~/lib/growth-programs";

export function useGrowthPrograms() {
  return useQuery({
    queryKey: ["growthPrograms"],
    queryFn: getGrowthPrograms,
    initialData: [],
  });
}
