import { searchResultSchema } from "./validation/search";

export async function search(query: string) {
  const resonse = await fetch(`/api/search?q=${query}`);
  return searchResultSchema.parse(await resonse.json());
}
