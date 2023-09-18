import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

export function EmailInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <label htmlFor={field.name}>{field.name}</label>
      <input {...field} type="email" placeholder={field.name} />
      {fieldState.error && <p>{fieldState.error.message}</p>}
      {fieldState.isTouched && <p>Touched</p>}
      {fieldState.isDirty && <p>Dirty</p>}
    </div>
  );
}
