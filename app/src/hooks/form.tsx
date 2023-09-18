import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";
import { type z } from "zod";

export type UseZodFormParams<Schema extends z.Schema<FieldValues>> = Parameters<
  typeof useForm<z.infer<Schema>>
>[0];

export const useHookFormDefaultProps = {
  mode: "onBlur",
  reValidateMode: "onChange",
  criteriaMode: "all",
  delayError: 300,
} satisfies UseZodFormParams<z.Schema<FieldValues>>;

export function useZodForm<Schema extends z.Schema<FieldValues>>(
  schema: Schema,
  props?: UseZodFormParams<Schema>
) {
  return useForm<z.infer<Schema>>({
    ...useHookFormDefaultProps,
    ...props,
    resolver: zodResolver(schema),
  });
}
