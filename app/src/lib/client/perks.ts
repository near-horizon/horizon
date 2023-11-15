import { z } from "zod";
import { perkSchema } from "../validation/perks";

export async function getPerks() {
  const response = await fetch("/api/perks");
  const perks = z.array(perkSchema).parse(await response.json());
  return perks;
}
