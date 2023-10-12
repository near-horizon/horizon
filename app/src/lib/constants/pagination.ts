import { type FetchMany } from "../validation/fetching";

export const pageSize = 24;

export const query = {
  from: 0,
  sort: "timedesc",
  limit: 8,
} satisfies FetchMany;
