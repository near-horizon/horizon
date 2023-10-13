import { useQuery } from "@tanstack/react-query";
import { getHorizonEvents } from "~/lib/events";

export function useHorizonEvents() {
  return useQuery({
    queryKey: ["horizonEvents"],
    queryFn: getHorizonEvents,
    initialData: [],
  });
}
