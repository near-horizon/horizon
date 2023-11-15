"use client";

import { cn } from "~/lib/utils";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export function Card({
  icon,
  title,
  bullets,
  link,
  linkText,
  focus = false,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  link: string;
  linkText: string;
  focus?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  }, [ref, focus]);

  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-between gap-8 px-8 py-6",
        "rounded-xl border-ui-elements-light bg-background-white shadow shadow-ui-elements-light transition-all duration-500 hover:shadow-ui-elements-gray"
      )}
    >
      <div className="flex w-full flex-col items-center justify-start gap-3">
        {icon}
        <h4 className="text-lg font-bold text-text-black">{title}</h4>
        <ul className="flex list-disc flex-col items-start justify-start gap-1 text-sm font-normal text-ui-elements-black">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <Button
        variant="default"
        className={cn(
          "border border-ui-elements-light bg-white transition-all duration-500 group-hover:border-primary group-hover:bg-primary"
        )}
      >
        <input type="hidden" ref={ref} autoFocus={focus} />
        <Link href={link}>{linkText}</Link>
      </Button>
    </div>
  );
}
