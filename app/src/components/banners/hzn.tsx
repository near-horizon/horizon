"use client";

import { Send01Svg } from "~/icons";
import { BannerShell } from "../banner-shell";
import { Button } from "../ui/button";

export function HZNBanner() {
  return (
    <BannerShell id="hzn">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-14">
        <div className="flex flex-row items-center justify-start gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block"
          >
            <path
              d="M17.3985 22.6233L11.9993 9.12508L14.0103 22.9529C14.0561 23.2667 14.3254 23.5 14.6426 23.5H16.8055C17.2576 23.5 17.5662 23.0433 17.3985 22.6239V22.6233ZM9.98778 22.9522L11.9987 9.12443L6.59957 22.6226C6.43183 23.042 6.74044 23.4987 7.19255 23.4987H9.35548C9.67261 23.4987 9.94191 23.2661 9.98778 22.9516V22.9522ZM21.0711 0.5H2.92764C1.58703 0.5 0.5 1.58706 0.5 2.92771V21.0716C0.5 21.3141 0.536038 21.5487 0.602872 21.7695C0.75161 22.2616 1.39374 22.3828 1.7148 21.9818L12 9.12508L22.2852 21.9818C22.6063 22.3828 23.2484 22.2616 23.3971 21.7695C23.464 21.5487 23.5 21.3147 23.5 21.0716V2.92771C23.5 1.58706 22.413 0.5 21.0724 0.5H21.0711Z"
              fill="white"
            ></path>
          </svg>
          <p className="text-center font-bold text-white">
            Next HZN Cohort Starts in{" "}
            <span className="text-primary">January 2024.</span> Apply now!
          </p>
        </div>
        <div className="flex flex-row-reverse items-center justify-start gap-3 md:flex-row">
          <a href="https://hzn.xyz/hzn">
            <Button className="flex flex-row items-center justify-center gap-2 px-3 py-2 text-sm font-medium">
              <Send01Svg className="h-4 w-4" />
              Apply to HZN
            </Button>
          </a>
          <a
            className="font-medium text-white underline"
            href="https://hzn.xyz/hzn"
          >
            Learn more
          </a>
        </div>
      </div>
    </BannerShell>
  );
}
