import { useEffect, useState } from "react";
import { type z } from "zod";

export function useLocalStorageItem<T, Schema extends z.ZodSchema<T>>(
  key: string,
  schema: Schema,
) {
  const [value, setValue] = useState<z.infer<Schema>>();

  useEffect(() => {
    function handleStorageUpdate() {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(schema.parse(JSON.parse(item)));
      }
    }
    handleStorageUpdate();

    window.addEventListener(`storage-${key}`, handleStorageUpdate);

    return () => {
      window.removeEventListener(`storage-${key}`, handleStorageUpdate);
    };
  }, [key, schema]);

  return value;
}

export function setLocalStorageItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(`storage-${key}`));
}
