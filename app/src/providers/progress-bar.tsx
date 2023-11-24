"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AppProgressBar
        height="5px"
        color="#66a0ff"
        options={{ showSpinner: false }}
        delay={200}
        shallowRouting
      />
      {children}
    </>
  );
}
