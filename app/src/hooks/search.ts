import { useQuery } from "@tanstack/react-query";
import { search } from "~/lib/client/search";

export function useSearch(q: string) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => search(q),
    enabled: q.length > 0,
  });
}
