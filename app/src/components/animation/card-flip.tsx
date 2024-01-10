"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export function CardFlip({
  front,
  back,
  fliped,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  fliped?: boolean;
}) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(
      (fliped
        ? backRef.current?.getBoundingClientRect().height
        : frontRef.current?.getBoundingClientRect().height) ?? 0,
    );
  }, [fliped, backRef, frontRef]);

  return (
    <div
      className={cn("relative [transform-style:preserve-3d]")}
      style={{
        height: `${height}px`,
      }}
    >
      <div
        ref={frontRef}
        className={cn(
          "absolute z-10 w-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
          !fliped ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]",
        )}
      >
        {front}
      </div>
      <div
        ref={backRef}
        className={cn(
          "absolute w-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
          !fliped
            ? "[transform:rotateY(-180deg)]"
            : "[transform:rotateY(0deg)]",
        )}
      >
        {back}
      </div>
    </div>
  );
}
