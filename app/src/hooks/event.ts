import { useQuery } from "@tanstack/react-query";
import { getHorizonEvents } from "~/lib/client/events";

export function useHorizonEvents() {
  return useQuery({
    queryKey: ["horizonEvents"],
    queryFn: getHorizonEvents,
    initialData: [],
  });
}
