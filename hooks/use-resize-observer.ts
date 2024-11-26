"use client";

import { useEffect, useRef, useState } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useResizeObserver(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    if (!ref.current) return;

    observer.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref]);

  return size;
}