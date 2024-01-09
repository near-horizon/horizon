import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useWindowSize() {
  const [size, setSized] = useRafState({
    width: typeof window !== "undefined" ? window.innerWidth : Infinity,
    height: typeof window !== "undefined" ? window.innerHeight : Infinity,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = () =>
        setSized({ width: window.innerWidth, height: window.innerHeight });

      window.addEventListener("resize", handler);

      return () => window.removeEventListener("resize", handler);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}

export function useRafState<T>(
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: T | ((prevState: T) => T)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
}

export function useUnmount(fn: () => void) {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
}
