"use client";

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue);
  const [value, setValue] = useState<T>(initialValueRef.current);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(key);
      if (rawValue) {
        setValue(JSON.parse(rawValue) as T);
      }
    } catch {
      setValue(initialValueRef.current);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [isLoaded, key, value]);

  return [value, setValue, isLoaded] as const;
}
