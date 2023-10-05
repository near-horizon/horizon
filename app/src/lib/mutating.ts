import { useEffect } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { updateFields } from "~/hooks/form";

export const progressSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string(),
});

export type Progress = z.infer<typeof progressSchema>;

export function useLocalSaveForm<T extends z.ZodObject<FieldValues>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<z.infer<T>, any, undefined>,
  schema: T,
  id: string
) {
  const change = form.watch();

  useEffect(() => {
    const data = readLocalSaveForm(id);
    updateFields(form, schema, data as Partial<z.infer<T>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(`form-${id}`, JSON.stringify(change));
  }, [change, id]);
}

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
