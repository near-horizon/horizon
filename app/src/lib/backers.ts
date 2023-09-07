import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { fetchManySchema, profileSchema } from "~/lib/fetching";
import {
  type AccountId,
  accountIdSchema,
  permissionSchema,
  transactionSchema,
  intoURLSearchParams,
} from "~/lib/utils";
import { pageSize } from "./constants/pagination";

export const backersQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
});

export type BackersQuery = z.infer<typeof backersQuerySchema>;

export async function getBackers(query: BackersQuery) {
  const result = await fetch("/api/backers?" + intoURLSearchParams(query));
  const backers = (await result.json()) as string[];
  return backers;
}

export async function getPaginatedBackers(pageParam = 0) {
  const result = await fetch(
    `/api/backers?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const backers = (await result.json()) as string[];

  return {
    items: backers,
    next: pageParam + 1,
  };
}

export function useBackers(query: BackersQuery) {
  return useQuery({
    queryKey: ["backers", query],
    queryFn: () => getBackers(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedBackers() {
  return useInfiniteQuery({
    queryKey: ["backers-paginated"],
    queryFn: ({ pageParam }) => getPaginatedBackers(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export const horizonSchema = z.object({
  permissions: z.record(accountIdSchema, z.array(permissionSchema)),
  verified: z.boolean(),
});

export const backerProfileSchema = profileSchema.extend({
  specialization: z.string().optional(),
  location: z.string().optional(),
});

export const backerSchema = horizonSchema
  .merge(backerProfileSchema.omit({ team: true }))
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export async function getBacker(accountId: z.infer<typeof accountIdSchema>) {
  const response = await fetch("/api/backers/" + accountId);

  return backerSchema.parse(await response.json());
}

export function useBacker(accountId: AccountId) {
  return useQuery({
    queryKey: ["backer", accountId],
    queryFn: () => getBacker(accountId),
    enabled: !!accountId,
  });
}
