import { z } from "zod";

import {
  type GrowthProgram,
  growthProgramSchema,
} from "../validation/growth-programs";

export async function getGrowthPrograms(): Promise<GrowthProgram[]> {
  const response = await fetch(`/api/growth-programs`);

  const growthPrograms = z
    .array(growthProgramSchema)
    .parseAsync(await response.json());

  return growthPrograms;
}
