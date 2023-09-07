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
import { paymentTypeSchema } from "./requests";
import { pageSize } from "./constants/pagination";

export const contributorsQuerySchema = fetchManySchema.extend({
  verified: z.array(z.boolean()).optional(),
  active: z.array(z.boolean()).optional(),
  org_type: z.array(z.string()).optional(),
  payment_type: z.array(paymentTypeSchema).optional(),
  work: z.array(z.string()).optional(),
  rate: z.array(z.tuple([z.number(), z.number()])).optional(),
});

export type ContributorsQuery = z.infer<typeof contributorsQuerySchema>;

export async function getContributors(query: ContributorsQuery) {
  const result = await fetch("/api/contributors?" + intoURLSearchParams(query));
  const contributors = (await result.json()) as string[];
  return contributors;
}

export async function getPaginatedContributors(pageParam = 0) {
  const result = await fetch(
    `/api/contributors?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const contributors = (await result.json()) as string[];

  return {
    items: contributors,
    next: pageParam + 1,
  };
}

export function useContributors(query: ContributorsQuery) {
  return useQuery({
    queryKey: ["contributors", query],
    queryFn: () => getContributors(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedContributors() {
  return useInfiniteQuery({
    queryKey: ["contributors-paginated"],
    queryFn: ({ pageParam }) => getPaginatedContributors(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export const horizonSchema = z.object({
  permissions: z.record(accountIdSchema, z.array(permissionSchema)),
  verified: z.boolean(),
  credits: z.boolean(),
});

export const contributorProfileSchema = profileSchema.extend({
  services: z.string().optional(),
  active: z.string().optional(),
  vendor_type: z.string().optional(),
  payments: z.record(z.string(), z.string()).optional(),
  rate: z.string().optional(),
  work: z.record(z.string(), z.string()).optional(),
  company_size: z.string().optional(),
  tags: z.record(z.string(), z.string()).optional(),
  organization: z.string().optional(),
  location: z.string().optional(),
});

export const contributorSchema = horizonSchema
  .merge(contributorProfileSchema.omit({ team: true }))
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export async function getContributor(accountId: AccountId) {
  const response = await fetch("/api/contributors/" + accountId);

  return contributorSchema.parse(await response.json());
}

export function useContributor(accountId: AccountId) {
  return useQuery({
    queryKey: ["contributor", accountId],
    queryFn: () => getContributor(accountId),
    enabled: !!accountId,
  });
}
