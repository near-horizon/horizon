"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AppProgressBar height="5px" color="#66a0ff" shallowRouting />
      {children}
    </>
  );
}
