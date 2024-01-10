import { useEffect } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { updateFields } from "~/hooks/form";
import { readLocalSaveForm } from "~/lib/client/mutating";

export function useLocalSaveForm<T extends z.ZodObject<FieldValues>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<z.infer<T>, any, undefined>,
  schema: T,
  id: string,
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
