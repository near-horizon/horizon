import { z } from "zod";

export const progressSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string(),
});

export type Progress = z.infer<typeof progressSchema>;

export function readLocalSaveForm(id: string): unknown {
  const form = localStorage.getItem(`form-${id}`);
  if (!form) {
    return null;
  }
  return JSON.parse(form);
}

export function clearLocalSaveForm(id: string) {
  localStorage.removeItem(`form-${id}`);
}
