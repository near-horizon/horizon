import { useEffect, useState } from "react";

export function useStore<T, F>(
  useStoreHook: (selector: (state: T) => F) => F,
  callback: (state: T) => F,
): F | undefined {
  const result = useStoreHook(callback);
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}
