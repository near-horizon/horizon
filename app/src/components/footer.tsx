"use client";

import Link from "next/link";
import { TwitterIcon, YoutubeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useIsOnboarding } from "~/hooks/profile";
import { cn } from "~/lib/utils";

export function Footer() {
  const isOnboarding = useIsOnboarding();

  return (
    <footer className="bg-ui-elements-white pb-4 pt-16 md:px-8">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 md:gap-12">
        <div
          className={cn(
            "flex w-full flex-col items-center justify-start gap-2 md:flex-row md:items-start md:gap-6",
            { hidden: isOnboarding },
          )}
        >
          <FooterSection
            header={
              <h3 className="text-xl font-semibold text-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="NEAR Horizon" />
              </h3>
            }
          >
            <p className="max-w-sm text-center md:text-left">
              An early stage accelerator empowering Web3 founders to build,
              connect, and grow
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <a href="https://twitter.com/nearhorizon" target="_blank">
                <TwitterIcon size={24} fill="currentColor" />
              </a>
              <a href="#">
                <YoutubeIcon
                  size={32}
                  fill="currentColor"
                  stroke="var(--background--white)"
                />
              </a>
            </div>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">Explore</h3>
            }
          >
            <ul className="flex flex-col items-center md:items-start">
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/requests">Contribution requests</Link>
              </li>
              <li>
                <Link href="/contributors">Contributors</Link>
              </li>
              <li>
                <Link href="/backers">Backers</Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">Connect</h3>
            }
          >
            <ul className="flex flex-col items-center md:items-start">
              <li>
                <a href="https://lu.ma/u/usr-5oZHY9dEDbDcaHY" target="_blank">
                  Events calendar
                </a>
              </li>
              <li>
                <a href="mailto:horizon@near.foundation">
                  Reach out to us directly
                </a>
              </li>
            </ul>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">
                Get help
              </h3>
            }
          >
            <ul className="flex flex-col items-center md:items-start">
              <li>
                <Link href="/learn">Learning resources</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </FooterSection>
          <Link href="/onboarding">
            <Button variant="default">Create profile</Button>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 text-gray-600 md:flex-row md:gap-0">
          <span>© 2023</span>
          <Link href="/terms" className="md:translate-x-8">
            Terms & conditions
          </Link>
          <span className="flex flex-row items-center gap-2">
            Built on
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/near-logo.svg" alt="NEAR logo" />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({
  header,
  children,
}: {
  children?: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 md:w-1/5 md:items-start md:justify-start">
      <div className="flex h-11 flex-col items-center justify-center md:items-start md:justify-start">
        {header}
      </div>
      {children}
    </div>
  );
}
